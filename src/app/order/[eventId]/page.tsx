import { createClient } from "@/lib/supabase/server";
import OrderClient from "./OrderClient";

interface Props {
  params: Promise<{ eventId: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { eventId } = await params;
  const supabase = await createClient();

  // Fetch menu items from database
  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("id, name, description, price_cents")
    .eq("is_available", true)
    .order("sort_order", { ascending: true });

  // Fetch event details to verify it exists and is orderable
  const { data: event } = await supabase
    .from("events")
    .select("id, name, venue_name, is_published")
    .eq("id", eventId)
    .single();

  if (!event || !event.is_published) {
    return (
      <>
        <section className="bg-teal py-20 md:py-24 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
              Event Not Found
            </h1>
            <p className="text-cream/60 max-w-md mx-auto text-[15px] leading-relaxed">
              This event is not available for ordering.
            </p>
          </div>
        </section>
        <section className="py-16 bg-cream text-center">
          <a
            href="/events"
            className="inline-block bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200"
          >
            View Events
          </a>
        </section>
      </>
    );
  }

  return (
    <OrderClient
      eventId={eventId}
      eventName={event.name}
      venueName={event.venue_name}
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
