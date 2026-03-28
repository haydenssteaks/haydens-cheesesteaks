"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="bg-teal py-16 md:py-20 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            Sign In
          </h1>
          <p className="text-cream/60 text-[15px]">
            Access your order history and speed up checkout.
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
                  Email
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
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                />
              </div>
              <div className="flex justify-end">
                <Link
                  href="/account/reset-password"
                  className="text-sm text-teal hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal text-cream py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <p className="text-center text-sm text-charcoal/60 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/account/register"
                className="text-teal font-semibold hover:underline"
              >
                Create one
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
