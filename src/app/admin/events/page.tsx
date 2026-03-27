import { createClient } from "@/lib/supabase/server";
import EventsTable from "./EventsTable";
import CreateEventForm from "./CreateEventForm";

export default async function AdminEventsPage() {
  const supabase = await createClient();

  const { data: events } = await supabase
    .from("events")
    .select(`
      id, name, venue_name, event_date, orders_open,
      orders_count:orders(count)
    `)
    .order("event_date", { ascending: true });

  const normalised = (events ?? []).map((e) => ({
    ...e,
    orders_count: (e.orders_count as unknown as { count: number }[])?.[0]?.count ?? 0,
  }));

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-charcoal">Events</h1>
        <CreateEventForm />
      </div>

      {normalised.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <p className="text-charcoal/40 text-sm">No events yet. Create your first one above.</p>
        </div>
      ) : (
        <EventsTable initialEvents={normalised} />
      )}
    </div>
  );
}
