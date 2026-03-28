import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "One sandwich. Perfected. Authentic Philly-style cheesesteak: premium hand-sliced beef, white american cheese, sharp cheddar, six hour caramelized onions on a sesame seed baguette. $23.",
  openGraph: {
    title: "Menu | Hayden's Cheesesteaks",
    description:
      "One sandwich. Perfected. Authentic Philly-style cheesesteak for $23.",
    images: ["/images/hero-cheesesteak.jpg"],
  },
};

const INGREDIENTS = [
  { name: "Premium hand-sliced beef", detail: "Thin-sliced and seared to order" },
];

const SIGNATURE_TOUCHES = [
  { name: "Sesame seed baguette", detail: "From local Toronto favourite Circles and Squares" },
  { name: "White american cheese", detail: "Classic Philly-style base" },
  { name: "Sharp cheddar cheese", detail: "For that extra bite" },
  { name: "Six hour caramelized onions", detail: "Slow-caramelized for deep, sweet flavour" },
];

export default function MenuPage() {
  return (
    <>
      {/* Hero with food photo */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <Image
          src="/images/hero-cheesesteak.jpg"
          alt="Hayden's signature cheesesteak"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-light text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            The Menu
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-4">
            One Sandwich. Perfected.
          </h1>
          <p className="text-cream/60 max-w-md mx-auto text-[15px] leading-relaxed">
            No compromises, no modifications. Just an authentic Philly
            cheesesteak the way it was meant to be.
          </p>
        </div>
      </section>

      <div className="checker-strip bg-cream" />

      {/* Menu Content */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Main item card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
            {/* Food photo */}
            <div className="h-48 md:h-64 relative">
              <Image
                src="/images/hero-cheesesteak.jpg"
                alt="The Hayden's cheesesteak"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            <div className="p-8 md:p-12 text-center">
              <div className="inline-block bg-gold/15 text-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
                Signature
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-teal mb-3">
                Cheesesteak
              </h2>
              <p className="text-4xl md:text-5xl font-bold text-charcoal mb-10 tracking-tight tabular-nums">
                $23
              </p>

              {/* Ingredients */}
              <div className="text-left max-w-sm mx-auto">
                <p className="text-xs text-charcoal/40 uppercase tracking-widest mb-5 text-center">
                  What&apos;s Inside
                </p>
                <ul className="space-y-4 mb-8">
                  {INGREDIENTS.map((ingredient) => (
                    <li
                      key={ingredient.name}
                      className="flex items-start gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                      <div>
                        <span className="text-charcoal font-medium text-[15px]">
                          {ingredient.name}
                        </span>
                        <span className="text-charcoal/45 text-sm ml-2">
                          {ingredient.detail}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-gold uppercase tracking-widest mb-5 text-center font-semibold">
                  Signature Touches
                </p>
                <ul className="space-y-4 mb-10">
                  {SIGNATURE_TOUCHES.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-start gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
                      <div>
                        <span className="text-charcoal font-semibold text-[15px]">
                          {item.name}
                        </span>
                        <span className="text-charcoal/45 text-sm ml-2">
                          {item.detail}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-charcoal/35 text-xs uppercase tracking-wider">
                No modifications
              </p>
            </div>
          </div>

          {/* Add-on */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-charcoal text-lg">
                  Pickled Hot Peppers
                </h3>
                <p className="text-charcoal/50 text-sm mt-0.5">
                  House pickled jalape&ntilde;os &amp; cherry peppers
                </p>
              </div>
              <p className="text-teal font-bold text-lg shrink-0">+$1</p>
            </div>
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
