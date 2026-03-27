import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | Hayden's Authentic Cheesesteaks",
  description: "One sandwich. Perfected. Authentic Philly-style cheesesteak served with white american cheese, sharp cheddar and caramelized onions.",
};

const INGREDIENTS = [
  "Sesame seed baguette",
  "White american cheese",
  "Sharp cheddar cheese",
  "Caramelized onions",
];

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
            No compromises, no modifications.
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">

          {/* Item card */}
          <div className="bg-white rounded-2xl p-10 shadow-sm mb-8 text-center">
            <div className="inline-block bg-gold/15 text-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Signature
            </div>
            <h2 className="font-display text-4xl font-bold text-teal mb-3">
              Cheesesteak
            </h2>
            <p className="font-display text-6xl font-bold text-charcoal mb-8">
              $23
            </p>

            {/* Ingredients */}
            <ul className="space-y-3 mb-8 text-left inline-block">
              {INGREDIENTS.map((ingredient) => (
                <li key={ingredient} className="flex items-center gap-3 text-charcoal/70 text-[15px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {ingredient}
                </li>
              ))}
            </ul>

            <p className="text-charcoal/35 text-xs uppercase tracking-wider">
              No modifications
            </p>
          </div>

          {/* CTA */}
          <div className="text-center bg-teal rounded-2xl px-8 py-10">
            <p className="font-display text-2xl font-bold text-cream mb-2">
              Ready to try one?
            </p>
            <p className="text-cream/60 text-sm mb-7">
              Order now for pickup at our next pop-up event.
            </p>
            <Link
              href="/order"
              className="inline-block bg-cream text-teal px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-200"
            >
              Order Now
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
