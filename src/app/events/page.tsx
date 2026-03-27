import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Events | Hayden's Authentic Cheesesteaks",
  description: "Find our upcoming pop-up events and pre-order your authentic cheesesteak for pickup.",
};

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("id, venue_name, venue_address, event_date, start_time, end_time, description, orders_open")
    .eq("is_published", true)
    .order("event_date", { ascending: true });

  return (
    <>
      {/* Hero */}
      <section className="bg-teal py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-gold-light text-xs font-semibold uppercase tracking-widest mb-4">
                Pop-Ups
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
                Upcoming Events
              </h1>
              <p className="text-cream/60 max-w-md text-[15px] leading-relaxed">
                Find us at restaurants and breweries across Toronto.
                Pre-order to guarantee your cheesesteak.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                src="/images/page-11.png"
                alt="Hayden's pop-up event"
                width={300}
                height={300}
                className="w-48 md:w-56 lg:w-64 rounded-xl opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {!events?.length && (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <p className="text-charcoal/40 text-sm">No upcoming events scheduled. Check back soon!</p>
              </div>
            )}
            {(events ?? []).map((event) => {
              const eventDate = new Date(event.event_date + "T12:00:00");

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="p-7 md:p-8">
                    {/* Date + Status row */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${event.orders_open ? "bg-teal/10 text-teal" : "bg-charcoal/8 text-charcoal/50"}`}
                      >
                        {event.orders_open ? "Orders Open" : "Orders Closed"}
                      </span>
                      <div className="text-right shrink-0">
                        <div className="font-display text-2xl font-bold text-teal leading-none">
                          {eventDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-xs text-charcoal/40 uppercase tracking-wide mt-1">
                          {eventDate.toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Venue */}
                    <h2 className="font-display text-xl font-bold text-charcoal mb-3">
                      {event.venue_name}
                    </h2>

                    {/* Meta */}
                    <div className="flex flex-col sm:flex-row gap-y-2 gap-x-6 text-charcoal/50 text-sm mb-4">
                      <span className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {event.venue_address}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.start_time} – {event.end_time}
                      </span>
                    </div>

                    <p className="text-charcoal/55 text-sm leading-relaxed mb-6">
                      {event.description}
                    </p>

                    {event.orders_open ? (
                      <Link
                        href={`/order/${event.id}`}
                        className="inline-block bg-teal text-cream px-7 py-3 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200"
                      >
                        Order Now
                      </Link>
                    ) : (
                      <p className="text-charcoal/35 text-sm">
                        Orders are currently closed for this event.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
