import { createClient } from "@/lib/supabase/server";

export async function getOrdersOpen(): Promise<boolean> {
  // Ordering is temporarily disabled
  return false;
}
