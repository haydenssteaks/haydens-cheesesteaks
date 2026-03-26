"use client";

import { useState } from "react";
import type { Metadata } from "next";

export default function CateringPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: Connect to Supabase to store inquiry
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <>
        <section className="bg-teal py-16 md:py-20 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-cream mb-4">
              Thank You!
            </h1>
            <p className="text-cream/70 max-w-md mx-auto">
              We&apos;ve received your catering inquiry and will be in touch
              within 48 hours.
            </p>
          </div>
        </section>
        <section className="py-16 bg-cream text-center">
          <a
            href="/"
            className="inline-block bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-teal-dark transition-colors"
          >
            Back to Home
          </a>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-teal py-16 md:py-20 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            Catering
          </h1>
          <p className="text-cream/70 max-w-md mx-auto">
            Let us bring the authentic cheesesteak experience to your next event.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="contact_email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="contact_phone"
                  className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="(416) 555-0123"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  name="event_name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Company Holiday Party"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Approximate Order Size *
                  </label>
                  <select
                    name="approximate_order_size"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  >
                    <option value="">Select size</option>
                    <option value="10-25">10 - 25 people</option>
                    <option value="25-50">25 - 50 people</option>
                    <option value="50-100">50 - 100 people</option>
                    <option value="100+">100+ people</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Event Time
                  </label>
                  <input
                    type="text"
                    name="event_time"
                    className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="2:00 PM - 6:00 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Event Location
                  </label>
                  <input
                    type="text"
                    name="event_location"
                    className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="123 Main St, Toronto"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Additional Details
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent resize-none"
                  placeholder="Any additional details about your event..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-teal text-cream py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-teal-dark transition-colors disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
