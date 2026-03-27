import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import crypto from "crypto";
import { createServerClient } from "@supabase/ssr";

const SQUARE_BASE_URL =
  process.env.SQUARE_ENVIRONMENT === "production"
    ? "https://connect.squareup.com"
    : "https://connect.squareupsandbox.com";

const paymentSchema = z.object({
  sourceId: z.string().min(1),
  items: z.array(
    z.object({
      menu_item_id: z.string().uuid(),
      quantity: z.number().int().min(1).max(50),
    })
  ).min(1),
  currency: z.string().default("CAD"),
  customerName: z.string().min(1).max(200),
  customerEmail: z.email(),
  eventId: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = paymentSchema.parse(body);

    // Create a Supabase client to look up prices server-side
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {
            // No-op for API routes
          },
        },
      }
    );

    // Look up actual prices from database
    const menuItemIds = parsed.items.map((i) => i.menu_item_id);
    const { data: menuItems, error: menuError } = await supabase
      .from("menu_items")
      .select("id, price_cents, is_available")
      .in("id", menuItemIds);

    if (menuError || !menuItems) {
      return NextResponse.json(
        { error: "Failed to look up menu items" },
        { status: 500 }
      );
    }

    // Verify all items exist and are available
    const menuMap = new Map(menuItems.map((m) => [m.id, m]));
    for (const item of parsed.items) {
      const menuItem = menuMap.get(item.menu_item_id);
      if (!menuItem) {
        return NextResponse.json(
          { error: `Menu item not found` },
          { status: 400 }
        );
      }
      if (!menuItem.is_available) {
        return NextResponse.json(
          { error: `Item is not currently available` },
          { status: 400 }
        );
      }
    }

    // Calculate amount from actual database prices
    const amount = parsed.items.reduce((sum, item) => {
      const menuItem = menuMap.get(item.menu_item_id)!;
      return sum + menuItem.price_cents * item.quantity;
    }, 0);

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Invalid order total" },
        { status: 400 }
      );
    }

    const idempotencyKey = crypto.randomUUID();

    const response = await fetch(`${SQUARE_BASE_URL}/v2/payments`, {
      method: "POST",
      headers: {
        "Square-Version": "2024-01-18",
        Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_id: parsed.sourceId,
        idempotency_key: idempotencyKey,
        amount_money: {
          amount,
          currency: parsed.currency,
        },
        location_id: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
        reference_id: parsed.eventId || undefined,
        note: `Pre-order for ${parsed.customerName} (${parsed.customerEmail})`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.errors?.map((e: { detail: string }) => e.detail).join(", ") ||
        "Payment failed";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      paymentId: data.payment.id,
      status: data.payment.status,
      amount,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
