"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

const FOOTER_LINKS = {
  Shop: [
    { label: "New Arrivals",  href: "/shop?sort=newest" },
    { label: "Best Sellers",  href: "/shop?sort=bestseller" },
    { label: "Sale",          href: "/shop?badge=sale" },
    { label: "Gift Cards",    href: "/gift-cards" },
  ],
  Company: [
    { label: "About Us",      href: "/about" },
    { label: "Journal",       href: "/blog" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers",       href: "/careers" },
  ],
  Help: [
    { label: "Contact",       href: "/contact" },
    { label: "FAQ",           href: "/faq" },
    { label: "Shipping",      href: "/policies/shipping" },
    { label: "Returns",       href: "/policies/returns" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-ink text-surface/80" role="contentinfo">
      {/* ── Main grid ── */}
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link
              href="/"
              className="font-display text-3xl font-light tracking-tighter text-white"
            >
              Atelier
            </Link>
            <p className="text-sm leading-relaxed text-surface/60 max-w-xs">
              Thoughtfully curated products for those who value quality, craft, and a considered life.
            </p>

            {/* Newsletter */}
            <div>
              <p className="label-caps text-surface/50 mb-3">Join the list</p>
              <form
                className="flex gap-2"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter signup"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-white/10 border border-white/20 rounded text-white placeholder:text-white/30 text-sm px-4 py-2.5 focus:outline-none focus:border-accent/80 focus:bg-white/15 transition-all"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-medium uppercase tracking-wider rounded transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {[
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: Twitter,   href: "https://twitter.com",   label: "Twitter" },
                { Icon: Facebook,  href: "https://facebook.com",  label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/40 hover:text-accent transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="label-caps text-white/50 mb-5">{heading}</h3>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-surface/60 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Legal bar ── */}
      <div className="border-t border-white/10">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface/40">
            © {new Date().getFullYear()} Atelier. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy",  href: "/policies/privacy" },
              { label: "Terms",    href: "/policies/terms" },
              { label: "Cookies",  href: "/policies/cookies" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-surface/40 hover:text-surface/80 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
