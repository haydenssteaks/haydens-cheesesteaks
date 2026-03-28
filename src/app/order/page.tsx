import { createClient } from "@/lib/supabase/server";
import { getOrdersOpen } from "@/lib/orders";
import OrderPageClient from "./OrderPageClient";

export default async function OrderPage() {
  const supabase = await createClient();
  const ordersOpen = await getOrdersOpen();

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
