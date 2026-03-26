"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    // TODO: Supabase auth register
    await new Promise((r) => setTimeout(r, 1000));
    setError("Registration will be connected when Supabase is configured.");
    setLoading(false);
  }

  return (
    <>
      <section className="bg-teal py-16 md:py-20 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            Create Account
          </h1>
          <p className="text-cream/70">
            Save your info for faster checkout and track your orders.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-md px-4">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-6">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-lg border border-cream-dark bg-cream/50 text-charcoal focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal text-cream py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-teal-dark transition-colors disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
            <p className="text-center text-sm text-charcoal/60 mt-6">
              Already have an account?{" "}
              <Link href="/account/login" className="text-teal font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
