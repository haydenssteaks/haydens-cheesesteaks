import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Hayden's Authentic Cheesesteaks",
  description: "The story behind Hayden's Authentic Cheesesteaks — a family tribute to Hayden Solomons and his love of Eagles football and Philly cheesesteaks.",
};

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-teal py-20 md:py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-gold-light text-xs font-semibold uppercase tracking-widest mb-4">
            The Story
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            Our Story
          </h1>
          <p className="text-cream/60 max-w-md mx-auto text-[15px] leading-relaxed">
            A family&apos;s love of football, cheesesteaks, and togetherness.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">

          {/* Logo image */}
          <div className="flex justify-center mb-14">
            <Image
              src="/images/page-07-event-poster.png"
              alt="Hayden's Authentic Cheesesteaks"
              width={360}
              height={360}
              className="w-64 md:w-72"
            />
          </div>

          {/* Story prose */}
          <div className="space-y-6 text-charcoal/70 leading-relaxed text-[16px]">
            <p>
              Food and Eagles football are the heart and soul of our family.
              When Hayden Solomons was just 10 years old, he chose the
              Philadelphia Eagles as his team and that choice became a family
              tradition. Over the years, his love for the Birds grew, and when
              he raised his own family, three more diehard Eagles fans joined
              the ranks.
            </p>

            <p>
              The Solomons family, proudly Canadian, spent countless hours
              together, road tripping to Philadelphia to watch the Eagles in
              action. Along the way, they devoured hundreds of cheesesteaks,
              cheered on their team in the City of Brotherly Love, and yet no
              matter where they went, Toronto was always home.
            </p>

            <p>
              Tragically, Hayden passed away during the height of the pandemic,
              leaving a legacy that deserves to be celebrated. Our business is
              a tribute to the man who sparked it all. Every cheesesteak we
              serve is inspired by the sandwiches he loved, crafted with 2
              simple goals: to honour his memory and share the flavours that
              fuelled his passion.
            </p>
          </div>

          {/* Pull quote */}
          <blockquote className="my-12 border-l-2 border-teal pl-6">
            <p className="font-display text-xl md:text-2xl text-teal italic leading-snug">
              &ldquo;We believe we&apos;ve perfected the art of the cheesesteak,
              one that Philly locals would be proud of and one that we know
              Hayden would love.&rdquo;
            </p>
          </blockquote>

          <div className="text-center">
            <Link
              href="/events"
              className="inline-block bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200"
            >
              See Upcoming Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
