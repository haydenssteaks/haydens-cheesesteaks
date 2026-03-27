"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone,
          },
        },
      });

      if (authError) {
        setError(authError.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <section className="bg-teal py-16 md:py-20 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cream/15 mb-6">
              <svg
                className="h-7 w-7 text-cream"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
              Check Your Email
            </h1>
            <p className="text-cream/60 max-w-md mx-auto text-[15px] leading-relaxed">
              We&apos;ve sent a confirmation link to <strong className="text-cream/80">{email}</strong>.
              Click the link to activate your account.
            </p>
          </div>
        </section>
        <section className="py-16 bg-cream text-center">
          <Link
            href="/account/login"
            className="inline-block bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200"
          >
            Go to Sign In
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-teal py-16 md:py-20 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            Create Account
          </h1>
          <p className="text-cream/60 text-[15px]">
            Save your info for faster checkout and track your orders.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-md px-4">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm rounded-xl p-3 mb-6">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                  Full Name <span className="text-teal">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                  placeholder="(416) 555-0123"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                  Password <span className="text-teal">*</span>
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                />
                <p className="text-xs text-charcoal/40 mt-1.5">
                  Minimum 8 characters
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal text-cream py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
            <p className="text-center text-sm text-charcoal/60 mt-6">
              Already have an account?{" "}
              <Link
                href="/account/login"
                className="text-teal font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Guest checkout callout */}
          <div className="mt-6 bg-teal/5 border border-teal/15 rounded-2xl p-6 text-center">
            <p className="text-sm text-charcoal/70 mb-2">
              No account needed to order
            </p>
            <Link
              href="/order"
              className="inline-block text-teal font-semibold text-sm hover:underline"
            >
              Continue as guest &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
