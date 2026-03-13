"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/lib/stores/cartStore";
import type { NavItem } from "@/lib/types";

/* ── Static nav config — replace with CMS data in production ────────────── */
const NAV_ITEMS: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Best Sellers", href: "/shop?sort=bestseller" },
      { label: "Sale",         href: "/shop?badge=sale",   badge: "Sale" },
    ],
  },
  { label: "Collections", href: "/collections" },
  { label: "About",       href: "/about" },
  { label: "Journal",     href: "/blog" },
];

export function Navbar() {
  const pathname           = usePathname();
  const { itemCount, openCart } = useCartStore();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  /* Detect scroll for transparent → solid header transition */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile nav on route change */
  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-sticky h-16 transition-all duration-300",
          scrolled || !isHome
            ? "bg-surface/95 backdrop-blur-md border-b border-ink-line/50 shadow-[0_1px_12px_rgba(26,26,26,0.06)]"
            : "bg-transparent",
        ].join(" ")}
        role="banner"
      >
        <div className="container-site h-full flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="font-display text-2xl font-light tracking-tighter text-ink-soft hover:text-accent transition-colors duration-200"
            aria-label="Carparachne — home"
          >
            Carparachne
          </Link>

          {/* ── Desktop nav ── */}
          <nav
            className="hidden lg:flex items-center gap-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className={[
                    "flex items-center gap-1 label-caps py-2 transition-colors duration-200",
                    pathname.startsWith(item.href) && item.href !== "/"
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink",
                  ].join(" ")}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && activeMenu === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 animate-fade-up">
                    <ul className="bg-surface-raised border border-ink-line rounded-lg shadow-modal py-2 min-w-[180px]">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="flex items-center justify-between px-5 py-2.5 text-sm text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors duration-150"
                          >
                            {child.label}
                            {child.badge && (
                              <span className="badge badge-accent ml-3">{child.badge}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <Link href="/search" className="btn-ghost" aria-label="Search">
              <Search size={18} />
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="btn-ghost relative"
              aria-label={`Cart, ${itemCount} items`}
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-accent text-white text-[10px] font-semibold rounded-full px-1 leading-none"
                  aria-live="polite"
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="btn-ghost lg:hidden ml-1"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-overlay bg-surface-overlay"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs z-drawer bg-surface-raised shadow-drawer flex flex-col pt-16 animate-slide-in-right"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col divide-y divide-ink-line/50 px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="py-4">
                  <Link
                    href={item.href}
                    className="label-caps text-ink-muted hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mt-3 flex flex-col gap-3 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-sm text-ink-muted hover:text-ink transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}

      {/* Spacer to offset fixed header */}
      <div className="h-16" aria-hidden />
    </>
  );
}
