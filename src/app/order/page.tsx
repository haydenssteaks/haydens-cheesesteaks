import { createClient } from "@/lib/supabase/server";
import OrderPageClient from "./OrderPageClient";

export default async function OrderPage() {
  const supabase = await createClient();

  // Check if orders are open
  const { data: setting } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "orders_open")
    .single();

  const ordersOpen = setting?.value === "true";

  // Fetch menu items from database
  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("id, name, description, price_cents")
    .eq("is_available", true)
    .order("sort_order", { ascending: true });

  return (
    <OrderPageClient
      ordersOpen={ordersOpen}
      menuItems={
        (menuItems ?? []).map((m) => ({
          id: m.id,
          name: m.name,
          description: m.description ?? "",
          price: m.price_cents,
        }))
      }
    />
  );
}
