import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story behind Hayden's Authentic Cheesesteaks — a family tribute to Hayden Solomons and his love of Eagles football and Philly cheesesteaks.",
  openGraph: {
    title: "Our Story | Hayden's Authentic Cheesesteaks",
    description:
      "A family tribute to Hayden Solomons — how a love of Eagles football and Philly cheesesteaks became Toronto's go-to cheesesteak spot.",
    images: ["/images/hayden-portrait.jpg"],
  },
};

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-teal overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center md:text-left">
              <p className="text-gold-light text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                The Story
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-5 leading-tight">
                In Memory of<br />Hayden Solomons
              </h1>
              <p className="text-cream/60 max-w-md mx-auto md:mx-0 text-[15px] leading-relaxed">
                A family&apos;s love of football, cheesesteaks, and togetherness —
                and the man who started it all.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="w-64 h-72 md:w-72 md:h-80 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-cream/10">
                  <Image
                    src="/images/hayden-portrait.jpg"
                    alt="Hayden Solomons"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Story prose */}
          <div className="space-y-6 text-charcoal/75 leading-relaxed text-[16px]">
            <p className="text-lg text-charcoal/85 font-medium leading-relaxed">
              Food and Eagles football are the heart and soul of our family.
              When Hayden Solomons was just 10 years old, he chose the
              Philadelphia Eagles as his team and that choice became a family
              tradition.
            </p>

            <p>
              Over the years, his love for the Birds grew, and when
              he raised his own family, three more diehard Eagles fans joined
              the ranks. The Solomons family, proudly Canadian, spent countless
              hours together, road tripping to Philadelphia to watch the Eagles
              in action.
            </p>

            <p>
              Along the way, they devoured hundreds of cheesesteaks,
              cheered on their team in the City of Brotherly Love, and yet no
              matter where they went, Toronto was always home.
            </p>
          </div>

          {/* Divider with logo */}
          <div className="flex items-center justify-center my-14">
            <div className="h-px bg-teal/15 flex-1" />
            <Image
              src="/images/logo-mark.jpg"
              alt="Hayden's"
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover mx-6"
            />
            <div className="h-px bg-teal/15 flex-1" />
          </div>

          <div className="space-y-6 text-charcoal/75 leading-relaxed text-[16px]">
            <p>
              Tragically, Hayden passed away in August 2020, during the height
              of the pandemic, leaving a legacy that deserves to be celebrated.
              Our business is a tribute to the man who sparked it all.
            </p>

            <p>
              Every cheesesteak we serve is inspired by the sandwiches he loved,
              crafted with 2 simple goals: to honour his memory and share the
              flavours that fuelled his passion.
            </p>

            <p>
              Toronto has never had a signature cheesesteak spot. We&apos;re
              changing that — one perfectly crafted sandwich at a time.
            </p>
          </div>

          {/* Pull quote */}
          <blockquote className="my-14 border-l-3 border-teal pl-6 py-2">
            <p className="font-display text-xl md:text-2xl text-teal italic leading-snug">
              &ldquo;We believe we&apos;ve perfected the art of the cheesesteak,
              one that Philly locals would be proud of and one that we know
              Hayden would love.&rdquo;
            </p>
          </blockquote>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/order"
              className="inline-block bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
