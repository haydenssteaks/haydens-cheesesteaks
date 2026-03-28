import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-cream">
      <div className="text-center px-4">
        <p className="font-script text-6xl md:text-7xl text-teal mb-4">404</p>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3">
          Page Not Found
        </h1>
        <p className="text-charcoal/60 text-[15px] mb-8 max-w-md mx-auto leading-relaxed">
          Looks like this page got lost on the way to the pop-up.
          Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-block bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
