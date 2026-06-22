import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import "@/styles/globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cartDrawer";
import { ToastRegion } from "@/components/shared/toastRegion";
import { Providers } from "./providers";

/* ── Font definitions ─────────────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
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
  title: {
    template: "%s — Carparachne",
    default: "Carparachne — Refined Commerce",
  },
  description: "Thoughtfully curated products for a considered life.",
  openGraph: {
    type: "website",
    locale: "en_US", // Note: If you want to translate the OG locale, you will need to move metadata generation into a generateMetadata function later.
    siteName: "Carparachne",
  },
  robots: { index: true, follow: true },
};

/* ── Layout ──────────────────────────────────────────────────────────────── */
// 1. Change to an async function and add the params object
export default async function RootLayout({
  children,
  params, // 1. Remove the direct destructuring here
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // 2. Type it as a Promise
}) {
  // 3. Await the params to get the locale
  const { locale } = await params;

  // Await the translations for the current locale
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
