"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import SquarePaymentForm from "@/components/SquarePaymentForm";
import { createOrder } from "@/lib/actions";
import { createClient } from "@/lib/supabase/client";

const MENU_ITEM = {
  id: "cheesesteak",
  name: "Cheesesteak",
  description: "Sesame seed baguette, white american cheese, sharp cheddar & caramelized onions. No modifications.",
  price: 2300,
};

const PEPPERS_PRICE = 100;

export default function OrderPage() {
  const [ordersOpen, setOrdersOpen] = useState<boolean | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<"build" | "checkout" | "confirmation">("build");
  const [addPeppers, setAddPeppers] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("settings")
      .select("value")
      .eq("key", "orders_open")
      .single()
      .then(({ data }) => setOrdersOpen(data?.value === "true"));
  }, []);

  const total = MENU_ITEM.price * quantity + (addPeppers ? PEPPERS_PRICE : 0);

  const handlePaymentError = useCallback((error: string) => {
    setPaymentError(error);
    setProcessing(false);
  }, []);

  const handlePaymentSuccess = useCallback(
    async (token: string) => {
      setProcessing(true);
      setPaymentError("");
      try {
        const res = await fetch("/api/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sourceId: token,
            amount: total,
            currency: "CAD",
            customerName,
            customerEmail,
          }),
        });
        const data = await res.json();
        if (data.success) {
          await createOrder({
            customerName,
            customerEmail,
            customerPhone,
            notes,
            totalCents: total,
            squarePaymentId: data.paymentId,
            items: [
              { id: MENU_ITEM.id, name: MENU_ITEM.name, quantity, priceCents: MENU_ITEM.price },
              ...(addPeppers ? [{ id: "peppers", name: "Pickled Hot Peppers", quantity: 1, priceCents: PEPPERS_PRICE }] : []),
            ],
          });
          setStep("confirmation");
        } else {
          setPaymentError(data.error || "Payment failed. Please try again.");
        }
      } catch {
        setPaymentError("Network error. Please try again.");
      }
      setProcessing(false);
    },
    [customerName, customerEmail, customerPhone, notes, quantity, total, addPeppers]
  );

  // Loading
  if (ordersOpen === null) {
    return (
      <section className="py-32 bg-cream text-center">
        <p className="text-charcoal/40 text-sm">Loading...</p>
      </section>
    );
  }

  // Orders closed
  if (!ordersOpen) {
    return (
      <>
        <section className="bg-teal py-20 md:py-24 text-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
              Orders Closed
            </h1>
            <p className="text-cream/60 max-w-md mx-auto text-[15px] leading-relaxed">
              We&apos;re not taking orders right now. Check back soon or follow us on Instagram for updates.
            </p>
          </div>
        </section>
        <section className="py-16 bg-cream text-center">
          <Link
            href="/"
            className="inline-block bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200"
          >
            Back to Home
          </Link>
        </section>
      </>
    );
  }

  // Confirmation
  if (step === "confirmation") {
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
              Order Confirmed!
            </h1>
            <p className="text-cream/60 max-w-md mx-auto text-[15px] leading-relaxed">
              A confirmation email has been sent to {customerEmail}. Show this page at pickup.
            </p>
          </div>
        </section>
        <section className="py-16 bg-cream">
          <div className="mx-auto max-w-md px-4 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
              <p className="text-xs text-charcoal/40 uppercase tracking-widest mb-3">Order Total</p>
              <p className="font-display text-4xl font-bold text-teal">${(total / 100).toFixed(2)}</p>
              <p className="text-sm text-charcoal/50 mt-3">{quantity} × Cheesesteak{addPeppers ? " + Pickled Hot Peppers" : ""}</p>
            </div>
            <Link
              href="/"
              className="inline-block bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-teal py-12 md:py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-cream mb-2">
            {step === "build" ? "Your Order" : "Checkout"}
          </h1>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-cream">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
          {step === "build" ? (
            <>
              {/* Menu item */}
              <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between gap-6 mb-4">
                <div>
                  <h3 className="font-display font-bold text-charcoal text-xl">{MENU_ITEM.name}</h3>
                  <p className="text-charcoal/50 text-sm mt-1 leading-relaxed">{MENU_ITEM.description}</p>
                  <p className="text-teal font-bold mt-2 text-lg">${(MENU_ITEM.price / 100).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-full border border-cream-dark text-charcoal hover:border-teal hover:text-teal transition-colors flex items-center justify-center font-bold text-lg disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="w-7 text-center font-bold text-lg text-charcoal">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-full bg-teal text-cream hover:bg-teal-dark transition-colors flex items-center justify-center font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Peppers add-on */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-charcoal text-lg">Pickled Hot Peppers</h3>
                  <p className="text-charcoal/50 text-sm mt-0.5">House pickled jalapeños &amp; cherry peppers</p>
                  <p className="text-teal font-bold mt-1">+$1.00</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAddPeppers((p) => !p)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${addPeppers ? "bg-teal" : "bg-charcoal/20"}`}
                  aria-label={addPeppers ? "Remove pickled hot peppers" : "Add pickled hot peppers"}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${addPeppers ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
                <label className="block text-xs font-semibold text-charcoal/40 uppercase tracking-wider mb-2">
                  Special Instructions (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors resize-none"
                  placeholder="Any notes for your order..."
                />
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl p-5 shadow-sm sticky bottom-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-charcoal/40 uppercase tracking-wider">{quantity} item{quantity !== 1 ? "s" : ""}</p>
                    <p className="font-display text-2xl font-bold text-teal mt-0.5">${(total / 100).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => setStep("checkout")}
                    className="bg-teal text-cream px-7 py-3 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-5">
                <h3 className="font-display font-bold text-charcoal text-lg mb-4">Order Summary</h3>
                <div className="flex justify-between text-sm py-2.5 border-b border-cream-dark">
                  <span className="text-charcoal/70">{quantity}× Cheesesteak</span>
                  <span className="font-semibold text-charcoal">${((MENU_ITEM.price * quantity) / 100).toFixed(2)}</span>
                </div>
                {addPeppers && (
                  <div className="flex justify-between text-sm py-2.5 border-b border-cream-dark">
                    <span className="text-charcoal/70">Pickled Hot Peppers</span>
                    <span className="font-semibold text-charcoal">$1.00</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-teal pt-3 mt-1">
                  <span>Total</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
              </div>

              {/* Customer info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-5">
                <h3 className="font-display font-bold text-charcoal text-lg mb-5">Your Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/40 uppercase tracking-wider mb-2">
                      Name <span className="text-teal">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/40 uppercase tracking-wider mb-2">
                      Email <span className="text-teal">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal/40 uppercase tracking-wider mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-cream/40 text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-5">
                <h3 className="font-display font-bold text-charcoal text-lg mb-4">Payment</h3>
                {paymentError && (
                  <div className="bg-red-50 text-red-600 text-sm rounded-xl p-3 mb-4">{paymentError}</div>
                )}
                <SquarePaymentForm
                  amount={total}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  processing={processing}
                />
              </div>

              <button
                type="button"
                onClick={() => setStep("build")}
                className="w-full border border-teal/40 text-teal py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-teal/5 transition-colors duration-200"
              >
                ← Back to Order
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
