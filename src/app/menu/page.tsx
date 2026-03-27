import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | Hayden's Authentic Cheesesteaks",
  description: "Our menu featuring authentic Philly-style cheesesteaks served with white cheddar cheese and caramelized onions.",
};

export default function MenuPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-teal py-20 md:py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold-light text-xs font-semibold uppercase tracking-widest mb-4">
            The Menu
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            One Sandwich. Perfected.
          </h1>
          <p className="text-cream/60 max-w-md mx-auto text-[15px] leading-relaxed">
            Premium CAB chuck rolls. Seeded baguettes from Circles &amp; Squares.
            No compromises, no modifications.
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          {/* Main Item */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <Image
                src="/images/page-12.png"
                alt="Cheesesteak — $23"
                width={400}
                height={400}
                className="w-full rounded-2xl shadow-sm"
              />
            </div>
            <div>
              <div className="inline-block bg-gold/15 text-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                Signature
              </div>
              <h2 className="font-display text-4xl font-bold text-teal mb-2">
                Cheesesteak
              </h2>
              <p className="font-display text-5xl font-bold text-charcoal mb-5">
                $23
              </p>
              <p className="text-charcoal/60 text-sm leading-relaxed mb-2">
                Served with sharp white cheddar cheese &amp; caramelized onions.
              </p>
              <p className="text-charcoal/40 text-xs uppercase tracking-wider">
                No modifications
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-cream-dark mb-12" />

          {/* Ingredients */}
          <div className="mb-14">
            <h3 className="font-display text-2xl font-bold text-teal mb-8 text-center">
              What Goes Into It
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
              {[
                { name: "CAB Chuck Rolls", detail: "Certified Angus Beef, chopped fresh" },
                { name: "Seeded Baguettes", detail: "From Circles & Squares bakery" },
                { name: "Sharp White Cheddar", detail: "Premium Arla cheddar" },
                { name: "American Cheese", detail: "Classic Philly tradition" },
                { name: "Sweet Onions", detail: "Caramelized to perfection" },
              ].map((ingredient) => (
                <div key={ingredient.name} className="flex items-start gap-4">
                  <div className="w-1 h-1 rounded-full bg-gold mt-2.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal text-[15px]">
                      {ingredient.name}
                    </p>
                    <p className="text-charcoal/50 text-sm mt-0.5">
                      {ingredient.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-teal rounded-2xl px-8 py-10">
            <p className="font-display text-2xl font-bold text-cream mb-2">
              Ready to try one?
            </p>
            <p className="text-cream/60 text-sm mb-7">
              Pre-order for our next pop-up event and we&apos;ll have it ready for you.
            </p>
            <Link
              href="/events"
              className="inline-block bg-cream text-teal px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-200"
            >
              See Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
