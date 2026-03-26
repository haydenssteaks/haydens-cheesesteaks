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
      <section className="bg-teal py-16 md:py-20 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cream mb-4">
            Our Menu
          </h1>
          <p className="text-cream/70 max-w-md mx-auto">
            One sandwich. Perfected. Premium CAB chuck rolls on a seeded baguette.
          </p>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Main Item */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
            <div className="bg-teal p-1">
              <div className="border-2 border-cream/20 rounded-xl p-8 md:p-12 text-center">
                <Image
                  src="/logo-full.png"
                  alt="Hayden's"
                  width={120}
                  height={45}
                  className="h-10 w-auto mx-auto mb-8 brightness-0 invert"
                />
                <div className="inline-block bg-gold/20 text-gold-light px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  Signature
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                  Cheesesteak
                </h2>
                <p className="text-5xl font-bold text-cream mb-6">$23</p>
                <div className="border-t border-cream/20 pt-6 space-y-3">
                  <p className="text-cream/80 text-sm uppercase tracking-wider">
                    Served with white cheddar cheese &amp; caramelized onions
                  </p>
                  <p className="text-cream/60 text-xs uppercase tracking-wider">
                    No modifications
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h3 className="text-xl font-bold text-teal mb-6 text-center">
              What Goes Into It
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "CAB Chuck Rolls", detail: "Certified Angus Beef, chopped fresh" },
                { name: "Seeded Baguettes", detail: "From Circles & Squares bakery" },
                { name: "Sharp White Cheddar", detail: "Premium Arla cheddar" },
                { name: "American Cheese", detail: "Classic Philly tradition" },
                { name: "Sweet Onions", detail: "Caramelized to perfection" },
              ].map((ingredient) => (
                <div
                  key={ingredient.name}
                  className="flex items-start gap-3 p-3 rounded-lg bg-cream/50"
                >
                  <div className="w-2 h-2 rounded-full bg-teal mt-2 shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal text-sm">
                      {ingredient.name}
                    </p>
                    <p className="text-charcoal/60 text-xs">
                      {ingredient.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-charcoal/60 mb-4">
              Ready to try the best cheesesteak in Toronto?
            </p>
            <Link
              href="/events"
              className="inline-block bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-teal-dark transition-colors"
            >
              Pre-Order for Next Event
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
