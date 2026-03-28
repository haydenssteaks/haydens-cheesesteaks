"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-cream">
      <div className="text-center px-4">
        <p className="font-script text-5xl md:text-6xl text-teal mb-4">Oops</p>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3">
          Something Went Wrong
        </h1>
        <p className="text-charcoal/60 text-[15px] mb-8 max-w-md mx-auto leading-relaxed">
          We hit a snag. Give it another try and if the problem
          persists, reach out to us on Instagram.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-teal text-cream px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-teal-dark transition-colors duration-200 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
