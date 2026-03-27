"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateEventForm() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const supabase = createClient();
    await supabase.from("events").insert({
      name: data.name as string,
      venue_name: data.venue_name as string,
      venue_address: data.venue_address as string,
      event_date: data.event_date as string,
      start_time: data.start_time as string,
      end_time: data.end_time as string,
      description: (data.description as string) || null,
      orders_open: data.orders_open === "on",
      is_published: true,
    });
    setSubmitting(false);
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="bg-teal text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-dark transition-colors"
      >
        + New Event
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-lg">
            <h2 className="text-lg font-bold text-charcoal mb-6">Create Event</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-charcoal mb-1">Event Name</label>
                <input name="name" required type="text" className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal" placeholder="Pop-Up at..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1">Venue Name</label>
                <input name="venue_name" required type="text" className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1">Venue Address</label>
                <input name="venue_address" type="text" className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-1">Event Date</label>
                <input name="event_date" required type="date" className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">Start</label>
                  <input name="start_time" required type="time" className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">End</label>
                  <input name="end_time" required type="time" className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-charcoal mb-1">Description</label>
                <textarea name="description" rows={2} className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal resize-none" />
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <input name="orders_open" type="checkbox" id="orders_open" className="w-4 h-4 accent-teal" />
                <label htmlFor="orders_open" className="text-sm font-semibold text-charcoal">Open orders immediately</label>
              </div>
              <div className="sm:col-span-2 flex gap-3 pt-2">
                <button type="submit" disabled={submitting} className="bg-teal text-cream px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-dark transition-colors disabled:opacity-50">
                  {submitting ? "Creating..." : "Create Event"}
                </button>
                <button type="button" onClick={() => setOpen(false)} className="text-charcoal/60 text-sm font-medium hover:text-charcoal">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
