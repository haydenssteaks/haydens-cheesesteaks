"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/menu", label: "Menu" },
    { href: "/events", label: "Events" },
    { href: "/catering", label: "Catering" },
    { href: "/our-story", label: "Our Story" },
  ];

  return (
    <header className="bg-cream border-b border-cream-dark sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-full.png"
              alt="Hayden's Authentic Cheesesteaks"
              width={160}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide uppercase text-charcoal hover:text-teal transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/events"
              className="bg-teal text-cream px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase hover:bg-teal-dark transition-colors"
            >
              Pre-Order
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 border-t border-cream-dark pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-charcoal hover:text-teal transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/events"
                className="bg-teal text-cream px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase hover:bg-teal-dark transition-colors text-center mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pre-Order
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
