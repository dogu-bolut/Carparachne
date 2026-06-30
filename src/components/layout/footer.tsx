"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

const FOOTER_LINKS = {
  Shop: [
    { tKey: "newArrivals", href: "/shop?sort=newest" },
    { tKey: "ourSignatures", href: "/shop?sort=signature" },
    { tKey: "sale", href: "/shop?badge=sale" },
    { tKey: "giftCards", href: "/gift-cards" },
  ],
  Company: [
    { tKey: "aboutUs", href: "/about" },
    { tKey: "journal", href: "/blog" },
    { tKey: "sustainability", href: "/sustainability" },
    { tKey: "careers", href: "/careers" },
  ],
  Help: [
    { tKey: "contact", href: "/contact" },
    { tKey: "faq", href: "/faq" },
    { tKey: "shipping", href: "/policies/shipping" },
    { tKey: "returns", href: "/policies/returns" },
  ],
};

export function Footer() {
  const t = useTranslations("Footer");
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
              Carparachne
            </Link>
            <p className="text-sm leading-relaxed text-surface/60 max-w-xs">
              {t("description")}
            </p>

            {/* Newsletter */}
            <div>
              <p className="label-caps text-surface/50 mb-3">{t("joinTheList")}</p>
              <form
                className="flex gap-2"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter signup"
              >
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  required
                  className="flex-1 bg-white/10 border border-white/20 rounded text-white placeholder:text-white/30 text-sm px-4 py-2.5 focus:outline-none focus:border-accent/80 focus:bg-white/15 transition-all"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-medium uppercase tracking-wider rounded transition-colors duration-200 whitespace-nowrap"
                >
                  {t("subscribe")}
                </button>
              </form>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {[
                {
                  Icon: Instagram,
                  href: "https://instagram.com",
                  label: "Instagram",
                },
                {
                  Icon: Twitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
                {
                  Icon: Facebook,
                  href: "https://facebook.com",
                  label: "Facebook",
                },
                {
                  Icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
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
              <h3 className="label-caps text-white/50 mb-5">{t(`headings.${heading}`)}</h3>
              <ul className="flex flex-col gap-3">
                {links.map(({ tKey, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-surface/60 hover:text-white transition-colors duration-200"
                    >
                      {t(`links.${tKey}`)}
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
            {t("rightsReserved", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-5">
            {[
              { tKey: "privacy", href: "/policies/privacy" },
              { tKey: "terms", href: "/policies/terms" },
              { tKey: "cookies", href: "/policies/cookies" },
            ].map(({ tKey, href }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-surface/40 hover:text-surface/80 transition-colors"
              >
                {t(`legal.${tKey}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
