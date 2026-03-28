import Image from "next/image";
import Link from "next/link";
import { getOrdersOpen } from "@/lib/orders";

export default async function Home() {
  const ordersOpen = await getOrdersOpen();
  return (
    <>
      {/* Hero — Full-bleed food photography with overlay */}
      <section className="relative md:min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero-cheesesteak.jpg"
          alt="Loaded Philly-style cheesesteaks from Hayden's"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-20 w-full">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-14 lg:gap-20">
            {/* Logo */}
            <div className="shrink-0 mx-auto md:mx-0">
              <Image
                src="/images/logo-full-text.jpg"
                alt="Hayden's Cheesesteaks logo"
                width={200}
                height={200}
                className="w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-2xl shadow-2xl object-cover ring-2 ring-cream/20"
                priority
              />
            </div>
            {/* Copy */}
            <div className="text-center md:text-left">
              <p className="font-script text-4xl md:text-5xl lg:text-6xl text-cream/80 mb-2 md:mb-4 leading-snug">
                Toronto&apos;s Signature Cheesesteak
              </p>
              <p className="text-cream/80 text-sm md:text-base max-w-lg leading-relaxed mb-3 md:mb-4">
                Premium hand-sliced beef on a sesame seed baguette from local Toronto favourite Circles and Squares.
                White american cheese. Sharp cheddar. Six hour caramelized onions. No compromises.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                {ordersOpen && (
                  <Link
                    href="/order"
                    className="bg-cream text-teal px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-200 text-center"
                  >
                    Order Now
                  </Link>
                )}
                <Link
                  href="/our-story"
                  className="border border-cream/30 text-cream px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-cream/10 transition-colors duration-200 text-center"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="checker-strip bg-cream" />

      {/* How It Works */}
      <section className="py-8 md:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-14">
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              The Process
            </p>
            <h2 className="font-script text-3xl md:text-4xl text-teal">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
            {[
              {
                step: "01",
                title: "Find a Pop-Up",
                description:
                  "Follow us on Instagram for upcoming pop-up dates and locations. We announce new events regularly.",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Pre-Order or Walk Up",
                description:
                  "Order online ahead of time to skip the line, or just show up at the event.",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Pick Up & Enjoy",
                description:
                  "Grab your cheesesteak fresh off the grill and enjoy an authentic Philly experience.",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-4 md:p-8 shadow-sm card-hover"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <div className="font-display text-4xl font-bold text-teal/10 leading-none mb-3">
                      {item.step}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-teal/8 text-teal flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-base font-bold text-charcoal mb-2">
                      {item.title}
                    </h3>
                    <p className="text-charcoal/55 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="checker-strip bg-white" />

      {/* Our Story Preview — with Hayden's portrait */}
      <section className="py-8 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/hayden-portrait.jpg"
                    alt="Hayden Solomons"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src="/images/logo-full-text.jpg"
                    alt="Hayden's Cheesesteaks logo"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                The Story
              </p>
              <h2 className="font-script text-3xl md:text-4xl text-teal mb-6 leading-tight">
                Built on Family,<br />Football &amp; Flavour.
              </h2>
              <div className="space-y-2 md:space-y-4 text-charcoal/70 leading-relaxed text-[15px]">
                <p>
                  Food and Eagles football are the heart and soul of our family.
                  When Hayden Solomons was just 10 years old, he chose the
                  Philadelphia Eagles as his team — and that choice became a
                  family tradition.
                </p>
                <p>
                  Tragically, Hayden passed away during the height of the
                  pandemic. Our business is a tribute to the man who sparked it
                  all. Every cheesesteak we serve is crafted with 2 simple goals:
                  to honour his memory and share the flavours that fuelled his
                  passion.
                </p>
              </div>
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 mt-7 text-teal font-semibold text-sm hover:gap-3 transition-all duration-200"
              >
                Read the full story
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="checker-strip bg-cream" />

      {/* Menu Preview — with cheesesteak photo */}
      <section className="py-8 md:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-center">
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                The Menu
              </p>
              <h2 className="font-script text-3xl md:text-4xl text-teal mb-4 leading-tight">
                We do one thing, perfectly.
              </h2>
              <p className="text-charcoal/65 text-[15px] leading-relaxed mb-4 max-w-sm mx-auto md:mx-0">
                Premium hand-sliced beef on a sesame seed baguette from local Toronto favourite Circles and Squares.
                White american cheese. Sharp cheddar. Six hour caramelized onions.
              </p>
              <div className="inline-flex items-baseline gap-3 bg-teal/8 rounded-xl px-4 py-3 md:px-7 md:py-5 mb-5 md:mb-8">
                <p className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider">
                  Cheesesteak
                </p>
                <span className="text-charcoal/20">—</span>
                <p className="text-3xl font-bold text-teal tracking-tight tabular-nums">$23</p>
              </div>
              <div>
                <Link
                  href="/menu"
                  className="inline-block bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200"
                >
                  View Full Menu
                </Link>
              </div>
            </div>
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/hero-cheesesteak.jpg"
                  alt="Hayden's signature cheesesteak"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="checker-strip-cream bg-teal-dark" />

      {/* Catering CTA */}
      <section className="py-8 md:py-24 bg-teal-dark">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-light text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Catering
          </p>
          <h2 className="font-script text-3xl md:text-4xl text-cream mb-3">
            Feed Your Whole Crew.
          </h2>
          <p className="text-cream/60 text-[15px] mb-6 leading-relaxed max-w-lg mx-auto">
            Corporate events, private parties, and everything in between.
            We bring the authentic cheesesteak experience to you.
          </p>
          <Link
            href="/catering"
            className="inline-block bg-cream text-teal px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-white transition-colors duration-200"
          >
            Inquire About Catering
          </Link>
        </div>
      </section>

      <div className="checker-strip bg-cream" />

      {/* Instagram */}
      <section className="py-8 md:py-24 bg-cream">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Instagram
          </p>
          <h2 className="font-script text-3xl md:text-4xl text-teal mb-2">
            Follow the Journey.
          </h2>
          <p className="text-charcoal/55 text-[15px] mb-6">
            New events announced on Instagram first. Stay in the loop.
          </p>
          <a
            href="https://www.instagram.com/haydens_cheesesteaks/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border border-cream-dark text-charcoal px-8 py-4 rounded-2xl hover:border-teal/30 hover:shadow-sm transition-all duration-200"
          >
            <svg
              className="h-6 w-6 text-teal shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span className="font-semibold text-[15px]">
              @haydens_cheesesteaks
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
