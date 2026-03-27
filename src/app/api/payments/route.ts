import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SQUARE_BASE_URL =
  process.env.SQUARE_ENVIRONMENT === "production"
    ? "https://connect.squareup.com"
    : "https://connect.squareupsandbox.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceId, amount, currency, customerName, customerEmail, eventId } =
      body;

    // Validate required fields
    if (!sourceId || !amount || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate amount is a positive integer
    if (!Number.isInteger(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
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
        source_id: sourceId,
        idempotency_key: idempotencyKey,
        amount_money: {
          amount,
          currency: currency || "CAD",
        },
        location_id: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
        reference_id: eventId || undefined,
        note: `Pre-order for ${customerName} (${customerEmail})`,
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
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
