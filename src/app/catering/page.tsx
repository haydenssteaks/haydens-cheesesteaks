"use client";

import { useState } from "react";

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
        <section className="bg-teal py-20 md:py-24 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cream/15 mb-6">
              <svg className="h-7 w-7 text-cream" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
              Thank You!
            </h1>
            <p className="text-cream/60 max-w-md mx-auto text-[15px] leading-relaxed">
              We&apos;ve received your catering inquiry and will be in touch
              within 48 hours.
            </p>
          </div>
        </section>
        <section className="py-16 bg-cream text-center">
          <a
            href="/"
            className="inline-block bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200"
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
      <section className="bg-teal py-20 md:py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold-light text-xs font-semibold uppercase tracking-widest mb-4">
            Catering
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            Feed Your Whole Crew.
          </h1>
          <p className="text-cream/60 max-w-lg mx-auto text-[15px] leading-relaxed">
            Corporate events, private parties, and everything in between.
            We&apos;ve catered all sizes — tell us about yours.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-teal mb-8">
              Inquiry Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                    Your Name <span className="text-teal">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                    Email <span className="text-teal">*</span>
                  </label>
                  <input
                    type="email"
                    name="contact_email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="contact_phone"
                  className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                  placeholder="(416) 555-0123"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                  Event Name <span className="text-teal">*</span>
                </label>
                <input
                  type="text"
                  name="event_name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                  placeholder="Company Holiday Party"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                    Approximate Order Size <span className="text-teal">*</span>
                  </label>
                  <select
                    name="approximate_order_size"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                  >
                    <option value="">Select size</option>
                    <option value="10-25">10 – 25 people</option>
                    <option value="25-50">25 – 50 people</option>
                    <option value="50-100">50 – 100 people</option>
                    <option value="100+">100+ people</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                    Event Time
                  </label>
                  <input
                    type="text"
                    name="event_time"
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                    placeholder="2:00 PM – 6:00 PM"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                    Event Location
                  </label>
                  <input
                    type="text"
                    name="event_location"
                    className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                    placeholder="123 Main St, Toronto"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                  Additional Details
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors resize-none"
                  placeholder="Any additional details about your event..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-teal text-cream py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
