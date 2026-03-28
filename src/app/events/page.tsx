import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Hayden's Cheesesteaks",
  description: "Find our upcoming pop-up events and pre-order your authentic cheesesteak for pickup.",
};

export default function EventsPage() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-cream">
      <h1 className="font-display text-5xl md:text-7xl font-bold text-teal text-center">
        Check Back Soon!
      </h1>
    </section>
  );
}
