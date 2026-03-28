import { NextRequest, NextResponse } from "next/server";
import { sendPickupTimeNotification } from "@/lib/email";

/**
 * Supabase Database Webhook handler for orders.pickup_time updates.
 *
 * Setup in Supabase Dashboard → Database → Webhooks:
 * - Event: UPDATE on "orders" table
 * - URL: https://haydenscheesesteaks.com/api/webhooks/pickup-time
 * - Headers: Authorization: Bearer <SUPABASE_WEBHOOK_SECRET>
 *
 * Supabase sends the old and new record. We check if pickup_time
 * changed from null to a value and send the customer an email.
 */
export async function POST(request: NextRequest) {
  // Validate webhook secret
  const authHeader = request.headers.get("authorization");
  const expectedSecret = process.env.SUPABASE_WEBHOOK_SECRET;

  if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();

    // Supabase webhook payload structure:
    // { type: "UPDATE", table: "orders", record: {...}, old_record: {...} }
    const { record, old_record } = payload;

    if (!record || !old_record) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Only send email when pickup_time is newly set (was null, now has a value)
    if (!old_record.pickup_time && record.pickup_time) {
      await sendPickupTimeNotification({
        orderNumber: record.order_number,
        customerName: record.customer_name,
        customerEmail: record.customer_email,
        pickupTime: record.pickup_time,
        totalCents: record.total_cents,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pickup time webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
