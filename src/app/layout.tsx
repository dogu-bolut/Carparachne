// src/app/layout.tsx
// ─── Root layout — font injection, providers, persistent shell ───────────────

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import "@/styles/globals.css";

import { Navbar }       from "@/components/layout/navbar";
import { Footer }       from "@/components/layout/footer";
import { CartDrawer }   from "@/components/cart/cartDrawer";
import { ToastRegion }  from "@/components/shared/toastRegion";
import { Providers }    from "./providers";

/* ── Font definitions ─────────────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style:  ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style:  ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

/* ── Site-wide metadata ───────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       { template: "%s — Atelier", default: "Atelier — Refined Commerce" },
  description: "Thoughtfully curated products for a considered life.",
  openGraph: {
    type:        "website",
    locale:      "en_US",
    siteName:    "Atelier",
  },
  robots: { index: true, follow: true },
};

/* ── Layout ──────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          {/* Persistent chrome */}
          <Navbar />
          <CartDrawer />

          {/* Page content */}
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>

          <Footer />

          {/* Global toast notifications */}
          <ToastRegion />
        </Providers>
      </body>
    </html>
  );
}
