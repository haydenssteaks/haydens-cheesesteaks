"use client";

import { useEffect, useRef, useState } from "react";

interface SquarePaymentFormProps {
  amount: number; // cents
  onPaymentSuccess: (token: string) => void;
  onPaymentError: (error: string) => void;
  processing: boolean;
}

declare global {
  interface Window {
    Square?: {
      payments: (appId: string, locationId: string) => Promise<Payments>;
    };
  }
}

interface Payments {
  card: () => Promise<Card>;
}

interface Card {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<TokenResult>;
  destroy: () => Promise<void>;
}

interface TokenResult {
  status: string;
  token?: string;
  errors?: Array<{ message: string }>;
}

export default function SquarePaymentForm({
  amount,
  onPaymentSuccess,
  onPaymentError,
  processing,
}: SquarePaymentFormProps) {
  const [cardReady, setCardReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<Card | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === "production"
      ? "https://web.squarecdn.com/v1/square.js"
      : "https://sandbox.web.squarecdn.com/v1/square.js";
    script.onload = async () => {
      try {
        if (!window.Square) throw new Error("Square SDK not loaded");
        const payments = await window.Square.payments(
          process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID!,
          process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!
        );
        const card = await payments.card();
        await card.attach("#card-container");
        cardRef.current = card;
        setCardReady(true);
        setLoading(false);
      } catch (err) {
        console.error("Square init error:", err);
        onPaymentError("Failed to load payment form. Please refresh.");
        setLoading(false);
      }
    };
    script.onerror = () => {
      onPaymentError("Failed to load Square SDK.");
      setLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      if (cardRef.current) {
        cardRef.current.destroy().catch(() => {});
      }
    };
  }, [onPaymentError]);

  async function handlePay() {
    if (!cardRef.current) return;
    try {
      const result = await cardRef.current.tokenize();
      if (result.status === "OK" && result.token) {
        onPaymentSuccess(result.token);
      } else {
        const errorMsg =
          result.errors?.map((e) => e.message).join(", ") ||
          "Payment failed. Please check your card details.";
        onPaymentError(errorMsg);
      }
    } catch (err) {
      onPaymentError("An unexpected error occurred.");
    }
  }

  return (
    <div>
      <div
        id="card-container"
        className="min-h-[90px] border border-cream-dark rounded-lg p-1"
      >
        {loading && (
          <div className="flex items-center justify-center h-20 text-charcoal/40 text-sm">
            Loading payment form...
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handlePay}
        disabled={!cardReady || processing}
        className="w-full mt-4 bg-teal text-cream py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing
          ? "Processing..."
          : `Pay $${(amount / 100).toFixed(2)} CAD`}
      </button>
    </div>
  );
}
