"use client";

import { useState } from "react";

interface Event {
  id: string;
  name: string;
  venue_name: string;
  event_date: string;
  is_published: boolean;
  orders_count: number;
}

const SAMPLE_EVENTS: Event[] = [
  {
    id: "1",
    name: "Pop-Up at Brunswick Bierworks",
    venue_name: "Brunswick Bierworks",
    event_date: "2026-04-12",
    is_published: true,
    orders_count: 0,
  },
  {
    id: "2",
    name: "Pop-Up at Rainhard Brewing",
    venue_name: "Rainhard Brewing",
    event_date: "2026-04-26",
    is_published: false,
    orders_count: 0,
  },
];

export default function AdminEventsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-charcoal">Events</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-teal text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-dark transition-colors"
        >
          + New Event
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-charcoal mb-4">Create Event</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1">Event Name</label>
              <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal" placeholder="Pop-Up at..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1">Venue Name</label>
              <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1">Venue Address</label>
              <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1">Event Date</label>
              <input type="date" className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1">Start Time</label>
              <input type="time" className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1">End Time</label>
              <input type="time" className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-charcoal mb-1">Description</label>
              <textarea rows={2} className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal resize-none" />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="bg-teal text-cream px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-dark transition-colors">
                Create Event
              </button>
              <button type="button" onClick={() => setShowCreateForm(false)} className="text-charcoal/60 text-sm font-medium hover:text-charcoal">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cream-dark">
              <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Event</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Date</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Orders</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-charcoal/60 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_EVENTS.map((event) => (
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
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${event.is_published ? "bg-teal/10 text-teal" : "bg-charcoal/10 text-charcoal/60"}`}>
                    {event.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-teal text-sm font-medium hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
