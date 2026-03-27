import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Hayden's Authentic Cheesesteaks",
  description: "Find our upcoming pop-up events and pre-order your authentic cheesesteak for pickup.",
};

// Placeholder event data until Supabase is connected
const SAMPLE_EVENTS = [
  {
    id: "1",
    name: "Pop-Up at Brunswick Bierworks",
    venue_name: "Brunswick Bierworks",
    venue_address: "Brunswick Ave, Toronto",
    event_date: "2026-04-12",
    start_time: "11:30",
    end_time: "17:00",
    description: "Join us for authentic cheesesteaks at Brunswick Bierworks! Pre-orders recommended as we sell out fast.",
    preorder_opens_at: "2026-03-29T00:00:00",
    preorder_closes_at: "2026-04-08T23:59:59",
  },
  {
    id: "2",
    name: "Pop-Up at Rainhard Brewing",
    venue_name: "Rainhard Brewing",
    venue_address: "100 Symes Rd, Toronto",
    event_date: "2026-04-26",
    start_time: "12:00",
    end_time: "17:00",
    description: "We're bringing Philly to the Junction! Pre-order your cheesesteak for guaranteed pickup.",
    preorder_opens_at: "2026-04-12T00:00:00",
    preorder_closes_at: "2026-04-22T23:59:59",
  },
];

function getPreorderStatus(opensAt: string, closesAt: string) {
  const now = new Date();
  const opens = new Date(opensAt);
  const closes = new Date(closesAt);

  if (now < opens) {
    return {
      label: `Opens ${opens.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
      color: "bg-charcoal/8 text-charcoal/50",
      canOrder: false,
    };
  }
  if (now <= closes) {
    return {
      label: "Pre-Orders Open",
      color: "bg-teal/10 text-teal",
      canOrder: true,
    };
  }
  return {
    label: "Pre-Orders Closed",
    color: "bg-red-50 text-red-500",
    canOrder: false,
  };
}

export default function EventsPage() {
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
            {SAMPLE_EVENTS.map((event) => {
              const status = getPreorderStatus(
                event.preorder_opens_at,
                event.preorder_closes_at
              );
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
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${status.color}`}
                      >
                        {status.label}
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
                        {event.start_time} – {event.end_time} (or sold out)
                      </span>
                    </div>

                    <p className="text-charcoal/55 text-sm leading-relaxed mb-6">
                      {event.description}
                    </p>

                    {status.canOrder ? (
                      <Link
                        href={`/order/${event.id}`}
                        className="inline-block bg-teal text-cream px-7 py-3 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200"
                      >
                        Pre-Order Now
                      </Link>
                    ) : (
                      <p className="text-charcoal/35 text-sm">
                        {status.label === "Pre-Orders Closed"
                          ? "Walk-ups welcome at the event."
                          : "Pre-orders not yet available."}
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
