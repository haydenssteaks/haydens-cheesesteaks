import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-teal overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight">
                Authentic
                <br />
                Cheesesteaks,
                <br />
                <span className="text-gold-light">Done Right.</span>
              </h1>
              <p className="mt-6 text-lg text-cream/80 max-w-md mx-auto md:mx-0">
                Philly-style cheesesteaks crafted with premium ingredients,
                served at pop-up events across Toronto.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/events"
                  className="bg-cream text-teal px-8 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-white transition-colors text-center"
                >
                  Pre-Order Now
                </Link>
                <Link
                  href="/catering"
                  className="border-2 border-cream/40 text-cream px-8 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-cream/10 transition-colors text-center"
                >
                  Catering Inquiries
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/logo-icon-white.png"
                alt="Hayden's"
                width={400}
                height={400}
                className="w-64 md:w-80 lg:w-96 opacity-90"
                priority
              />
            </div>
          </div>
        </div>
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1440 20 1200 0 720 0C240 0 0 20 0 20L0 60Z" fill="#F5F0E8" />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-teal text-center mb-4">
            How It Works
          </h2>
          <p className="text-charcoal/60 text-center mb-12 max-w-xl mx-auto">
            Getting your cheesesteak is easy. Here&apos;s how our pop-up pre-order system works.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Check Events",
                description:
                  "Browse our upcoming pop-up events at restaurants and breweries across Toronto.",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Pre-Order",
                description:
                  "Place your order up to 2 weeks before the event. Pre-orders close 4 days prior.",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Pick Up & Enjoy",
                description:
                  "Show up at the event, grab your order, and enjoy an authentic Philly cheesesteak.",
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal/10 text-teal mb-5">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-gold uppercase tracking-widest mb-2">
                  Step {item.step}
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/logo-icon.png"
                alt="Hayden Solomons"
                width={400}
                height={400}
                className="w-full max-w-sm mx-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-teal mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-charcoal/80 leading-relaxed">
                <p>
                  Food and Eagles football are the heart and soul of our family.
                  When Hayden Solomons was just 10 years old, he chose the
                  Philadelphia Eagles as his team and that choice became a family
                  tradition. Over the years, his love for the Birds grew, and
                  when he raised his own family, three more diehard Eagles fans
                  joined the ranks.
                </p>
                <p>
                  The Solomons family, proudly Canadian, spent countless hours
                  together, road tripping to Philadelphia to watch the Eagles in
                  action. Along the way, they devoured hundreds of cheesesteaks,
                  cheered on their team in the City of Brotherly Love, and yet no
                  matter where they went, Toronto was always home.
                </p>
                <p>
                  Tragically, Hayden passed away during the height of the
                  pandemic, leaving a legacy that deserves to be celebrated. Our
                  business is a tribute to the man who sparked it all. Every
                  cheesesteak we serve is inspired by the sandwiches he loved,
                  crafted with 2 simple goals: to honour his memory and share the
                  flavours that fuelled his passion.
                </p>
                <p className="font-semibold text-teal">
                  We believe we&apos;ve perfected the art of the cheesesteak, one
                  that Philly locals would be proud of and one that we know
                  Hayden would love.
                </p>
              </div>
              <Link
                href="/our-story"
                className="inline-block mt-6 text-teal font-semibold text-sm uppercase tracking-wider hover:text-teal-dark transition-colors"
              >
                Read More &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-teal mb-4">
            The Cheesesteak
          </h2>
          <p className="text-charcoal/60 mb-10 max-w-lg mx-auto">
            One sandwich. Perfected. No compromises.
          </p>
          <div className="max-w-lg mx-auto bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-teal p-1">
              <div className="border-2 border-cream/20 rounded-xl p-8">
                <Image
                  src="/logo-full.png"
                  alt="Hayden's"
                  width={120}
                  height={45}
                  className="h-10 w-auto mx-auto mb-6 brightness-0 invert"
                />
                <h3 className="text-2xl font-bold text-cream mb-2">
                  Cheesesteak &mdash; $23
                </h3>
                <p className="text-cream/80 text-sm uppercase tracking-wider">
                  Served with white cheddar cheese &amp; caramelized onions
                </p>
                <p className="text-cream/60 text-xs mt-3 uppercase tracking-wider">
                  No modifications
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/menu"
            className="inline-block mt-8 bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-teal-dark transition-colors"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* Catering CTA */}
      <section className="py-16 md:py-24 bg-teal-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
            Catering Your Next Event?
          </h2>
          <p className="text-cream/70 mb-8 max-w-lg mx-auto">
            Let us bring the authentic cheesesteak experience to your event.
            We&apos;ve catered everything from corporate events to private
            parties.
          </p>
          <Link
            href="/catering"
            className="inline-block bg-cream text-teal px-8 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-white transition-colors"
          >
            Inquire About Catering
          </Link>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-teal mb-4">
            Follow the Journey
          </h2>
          <p className="text-charcoal/60 mb-8">
            Stay up to date with our latest events and behind-the-scenes action.
          </p>
          <a
            href="https://www.instagram.com/haydens_cheesesteaks/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <svg className="h-8 w-8 text-teal" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span className="text-lg font-semibold text-charcoal">
              @haydens_cheesesteaks
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
