import { createClient } from "@/lib/supabase/server";

export async function getOrdersOpen(): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "orders_open")
    .single();
  return data?.value === "true";
}
