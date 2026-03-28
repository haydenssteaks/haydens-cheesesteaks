"use server";

import { z } from "zod/v4";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin";

// ── Schemas ──────────────────────────────────────────────────────

const setOrdersOpenSchema = z.object({
  open: z.boolean(),
});

const cateringInquirySchema = z.object({
  contact_name: z.string().min(1, "Name is required").max(200),
  contact_email: z.email("Invalid email address"),
  contact_phone: z.string().max(30).optional(),
  event_name: z.string().min(1, "Event name is required").max(200),
  approximate_order_size: z.string().min(1, "Order size is required"),
  event_date: z.string().optional(),
  event_time: z.string().max(100).optional(),
  event_location: z.string().max(500).optional(),
  message: z.string().max(2000).optional(),
});

const createOrderSchema = z.object({
  event_id: z.string().uuid().optional(),
  customer_name: z.string().min(1, "Name is required").max(200),
  customer_email: z.email("Invalid email address"),
  customer_phone: z.string().max(30).optional(),
  notes: z.string().max(1000).optional(),
  items: z.array(
    z.object({
      menu_item_id: z.string().uuid(),
      quantity: z.number().int().min(1).max(50),
    })
  ).min(1, "Order must contain at least one item"),
  square_payment_id: z.string().min(1),
});

// ── Actions ──────────────────────────────────────────────────────

export async function setOrdersOpen(input: { open: boolean }) {
  // Admin-only action
  const { supabase } = await requireAdmin();

  const parsed = setOrdersOpenSchema.parse(input);

  const { error } = await supabase
    .from("settings")
    .upsert({ key: "orders_open", value: parsed.open ? "true" : "false" });

  if (error) throw new Error("Failed to update setting");

  revalidatePath("/admin");
  revalidatePath("/order");
  revalidatePath("/", "layout");
}

export async function submitCateringInquiry(input: {
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  event_name: string;
  approximate_order_size: string;
  event_date?: string;
  event_time?: string;
  event_location?: string;
  message?: string;
}) {
  const parsed = cateringInquirySchema.parse(input);

  const supabase = await createClient();

  const { error } = await supabase.from("catering_inquiries").insert({
    contact_name: parsed.contact_name,
    contact_email: parsed.contact_email,
    contact_phone: parsed.contact_phone || null,
    event_name: parsed.event_name,
    approximate_order_size: parsed.approximate_order_size,
    event_date: parsed.event_date || null,
    event_time: parsed.event_time || null,
    event_location: parsed.event_location || null,
    message: parsed.message || null,
  });

  if (error) throw new Error("Failed to submit inquiry");

  revalidatePath("/admin/catering");
  return { success: true };
}

export async function createOrder(input: {
  event_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  notes?: string;
  items: Array<{ menu_item_id: string; quantity: number }>;
  square_payment_id: string;
}) {
  const parsed = createOrderSchema.parse(input);

  const supabase = await createClient();

  // ── Server-side price calculation ──
  // Look up actual prices from database — never trust client-sent totals
  const menuItemIds = parsed.items.map((i) => i.menu_item_id);
  const { data: menuItems, error: menuError } = await supabase
    .from("menu_items")
    .select("id, price_cents, name, is_available")
    .in("id", menuItemIds);

  if (menuError || !menuItems) {
    throw new Error("Failed to look up menu items");
  }

  // Verify all items exist and are available
  const menuMap = new Map(menuItems.map((m) => [m.id, m]));
  for (const item of parsed.items) {
    const menuItem = menuMap.get(item.menu_item_id);
    if (!menuItem) throw new Error(`Menu item ${item.menu_item_id} not found`);
    if (!menuItem.is_available)
      throw new Error(`${menuItem.name} is not currently available`);
  }

  // Calculate totals server-side
  const subtotal_cents = parsed.items.reduce((sum, item) => {
    const menuItem = menuMap.get(item.menu_item_id)!;
    return sum + menuItem.price_cents * item.quantity;
  }, 0);
  const tax_cents = 0; // Add tax calculation here when needed
  const total_cents = subtotal_cents + tax_cents;

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      ...(parsed.event_id ? { event_id: parsed.event_id } : {}),
      customer_name: parsed.customer_name,
      customer_email: parsed.customer_email,
      customer_phone: parsed.customer_phone || null,
      notes: parsed.notes || null,
      status: "confirmed",
      subtotal_cents,
      tax_cents,
      total_cents,
      square_payment_id: parsed.square_payment_id,
    })
    .select("id")
    .single();

  if (orderError || !order) throw new Error("Failed to create order");

  // Insert order items
  const orderItems = parsed.items.map((item) => {
    const menuItem = menuMap.get(item.menu_item_id)!;
    return {
      order_id: order.id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      unit_price_cents: menuItem.price_cents,
      item_name: menuItem.name,
    };
  });

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw new Error("Failed to create order items");

  revalidatePath("/admin/orders");
  return { success: true, orderId: order.id, total_cents };
}
