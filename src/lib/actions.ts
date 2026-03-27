"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function setOrdersOpen(open: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("settings")
    .update({ value: open ? "true" : "false" })
    .eq("key", "orders_open");
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/order");
}

export async function submitCateringInquiry(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("catering_inquiries").insert({
    contact_name: formData.get("contact_name") as string,
    contact_email: formData.get("contact_email") as string,
    contact_phone: (formData.get("contact_phone") as string) || null,
    event_name: formData.get("event_name") as string,
    approximate_order_size: formData.get("approximate_order_size") as string,
    event_date: (formData.get("event_date") as string) || null,
    event_time: (formData.get("event_time") as string) || null,
    event_location: (formData.get("event_location") as string) || null,
    message: (formData.get("message") as string) || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/catering");
}

export async function createOrder(data: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  totalCents: number;
  squarePaymentId: string;
  items: Array<{ id: string; name: string; quantity: number; priceCents: number }>;
}) {
  const supabase = await createClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      customer_phone: data.customerPhone || null,
      notes: data.notes || null,
      subtotal_cents: data.totalCents,
      total_cents: data.totalCents,
      square_payment_id: data.squarePaymentId,
      status: "confirmed",
    })
    .select("id")
    .single();

  if (orderError) throw new Error(orderError.message);

  const { error: itemsError } = await supabase.from("order_items").insert(
    data.items.map((item) => ({
      order_id: order.id,
      menu_item_id: item.id,
      item_name: item.name,
      quantity: item.quantity,
      unit_price_cents: item.priceCents,
    }))
  );

  if (itemsError) throw new Error(itemsError.message);

  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  return order.id;
}
