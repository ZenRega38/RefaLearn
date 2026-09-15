"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/alumni", label: "Alumni" },
  { href: "/schedule", label: "Jadwal" },
  { href: "/materials", label: "Materi" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-paper-bg)]/95 backdrop-blur-md shadow-[var(--shadow-card)]"
            : "bg-transparent"
        }`}
      >
        <nav className="container-main flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
            <div className="relative">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                className="transition-transform duration-300 group-hover:rotate-[-5deg]"
              >
                <rect
                  x="2"
                  y="2"
                  width="32"
                  height="32"
                  rx="6"
                  stroke="var(--color-brand-blue)"
                  strokeWidth="2.5"
                  fill="var(--color-accent-yellow)"
                  fillOpacity="0.2"
                />
                <text
                  x="18"
                  y="24"
                  textAnchor="middle"
                  fontFamily="Kalam, cursive"
                  fontWeight="700"
                  fontSize="18"
                  fill="var(--color-brand-blue)"
                >
                  R
                </text>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-[var(--font-kalam)] text-xl font-bold text-[var(--color-brand-blue)]"
                style={{ fontFamily: "var(--font-kalam), Kalam, cursive" }}
              >
                Refa Learn
              </span>
              <span
                className="text-[0.55rem] tracking-[0.15em] text-[var(--color-ink-soft)] uppercase hidden sm:block"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                Bridging Borders
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    id={`nav-${link.label.toLowerCase()}`}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? "text-[var(--color-brand-blue)]"
                        : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                    }`}
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[var(--color-accent-coral)] rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              id="nav-login"
              className="text-sm font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-brand-blue)] transition-colors"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Masuk
            </Link>
            <Link href="/schedule" id="nav-cta-book" className="btn-primary text-sm !py-2 !px-4">
              Book Session
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-[5px] rounded-md hover:bg-[var(--color-paper-bg-alt)] transition-colors"
            aria-label="Toggle menu"
            id="nav-hamburger"
          >
            <span
              className={`block w-5 h-[2px] bg-[var(--color-ink)] transition-all duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-[var(--color-ink)] transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-[var(--color-ink)] transition-all duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className={`mobile-nav-overlay ${mobileOpen ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-[var(--color-paper-bg)] z-50 shadow-[var(--shadow-float)] transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-8">
          <ul className="flex flex-col gap-1 flex-1">
            {navLinks.map((link, idx) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li
                  key={link.href}
                  className="animate-slide-in-right"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]"
                        : "text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-bg-alt)] hover:text-[var(--color-ink)]"
                    }`}
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-3 pt-6 border-t-2 border-dashed border-[var(--color-line)]">
            <Link
              href="/login"
              className="btn-secondary text-center text-sm"
            >
              Masuk
            </Link>
            <Link
              href="/schedule"
              className="btn-primary text-center text-sm"
            >
              Book Session
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
}
