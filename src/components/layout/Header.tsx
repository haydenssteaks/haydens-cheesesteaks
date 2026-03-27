"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/menu", label: "Menu" },
    { href: "/events", label: "Events" },
    { href: "/catering", label: "Catering" },
    { href: "/our-story", label: "Our Story" },
  ];

  return (
    <header
      className={`bg-cream/95 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-cream-dark shadow-sm" : "border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo-mark.jpg"
              alt="Hayden's Authentic Cheesesteaks"
              width={44}
              height={44}
              className="h-10 w-10 md:h-11 md:w-11 rounded-full object-cover"
              priority
            />
            <span className="ml-3 font-display text-lg font-bold text-teal hidden sm:block">
              Hayden&apos;s
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    active
                      ? "text-teal"
                      : "text-charcoal/65 hover:text-teal"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-teal transition-all duration-200 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/order"
              className="bg-teal text-cream px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-teal-dark transition-colors duration-200 shrink-0"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-charcoal/70 hover:text-charcoal transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-cream-dark py-4 mobile-menu-enter">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium transition-colors py-2.5 px-2 rounded-lg ${
                      active
                        ? "text-teal bg-teal/5"
                        : "text-charcoal/75 hover:text-teal hover:bg-teal/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 mt-1 border-t border-cream-dark">
                <Link
                  href="/order"
                  className="inline-block bg-teal text-cream px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-teal-dark transition-colors text-center"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
