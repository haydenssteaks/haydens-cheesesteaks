"use client";

import { useState, useTransition } from "react";
import { setOrdersOpen } from "@/lib/actions";

interface Event {
  id: string;
  name: string;
  venue_name: string;
  event_date: string;
  orders_open: boolean;
  orders_count: number;
}

export default function EventsTable({ initialEvents }: { initialEvents: Event[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [pending, startTransition] = useTransition();

  function handleToggle(id: string, current: boolean) {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, orders_open: !current } : e))
    );
    startTransition(() => setOrdersOpen({ open: !current }));
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-cream-dark">
            <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Event</th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Date</th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Orders</th>
            <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Orders Open</th>
            <th className="text-right px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b border-cream-dark last:border-0 hover:bg-cream/30">
              <td className="px-6 py-4">
                <p className="font-semibold text-charcoal text-sm">{event.name}</p>
                <p className="text-charcoal/60 text-xs">{event.venue_name}</p>
              </td>
              <td className="px-6 py-4 text-sm text-charcoal/80">
                {new Date(event.event_date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </td>
              <td className="px-6 py-4 text-sm text-charcoal/80">{event.orders_count}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleToggle(event.id, event.orders_open)}
                  disabled={pending}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-60 ${event.orders_open ? "bg-teal" : "bg-charcoal/20"}`}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${event.orders_open ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-teal text-sm font-medium hover:underline">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
