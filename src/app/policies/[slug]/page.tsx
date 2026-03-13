// src/app/policies/[slug]/page.tsx
// ─── Shared layout for all policy pages ─────────────────────────────────────

import type { Metadata } from "next";
import { notFound }  from "next/navigation";
import Link from "next/link";

/* Policy registry — content should come from CMS/MDX in production */
const POLICIES: Record<string, { title: string; lastUpdated: string; content: string }> = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "1 March 2025",
    content: `
      <h2>1. Information We Collect</h2>
      <p>When you place an order, create an account, or browse our website, we may collect personal information including your name, email address, shipping address, payment details (processed securely by Stripe — we never store card data), and browsing behaviour.</p>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to process and fulfil orders, send transactional emails (order confirmation, shipping updates), provide customer support, and, if you've opted in, send marketing communications. We never sell your data to third parties.</p>

      <h2>3. Cookies</h2>
      <p>We use strictly necessary cookies to operate our site and, with your consent, analytics cookies (via a privacy-first provider) to understand how our site is used. You can manage cookie preferences at any time via the link in our footer.</p>

      <h2>4. Data Retention</h2>
      <p>We retain your personal data for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time by contacting us at privacy@atelier.com.</p>

      <h2>5. Your Rights</h2>
      <p>Under GDPR, you have the right to access, correct, delete, restrict processing of, and port your personal data. You also have the right to object to processing and to withdraw consent where processing is based on consent.</p>

      <h2>6. Contact</h2>
      <p>For any privacy-related enquiries, please contact our Data Controller at privacy@atelier.com.</p>
    `,
  },
  terms: {
    title: "Terms & Conditions",
    lastUpdated: "1 March 2025",
    content: `
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using atelier.com, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please discontinue use of the site.</p>

      <h2>2. Products and Pricing</h2>
      <p>All prices are displayed in Euros (EUR) and include VAT where applicable. We reserve the right to change prices at any time without notice. Product images are illustrative; actual colours may vary slightly due to screen calibration.</p>

      <h2>3. Orders</h2>
      <p>Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel any order. A contract is formed only when we dispatch your goods and send a dispatch confirmation email.</p>

      <h2>4. Intellectual Property</h2>
      <p>All content on this site — including images, text, logos, and design — is the property of Atelier ApS and is protected by copyright law. Reproduction without express written permission is prohibited.</p>

      <h2>5. Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, Atelier shall not be liable for any indirect, incidental, or consequential damages arising from use of our products or website.</p>

      <h2>6. Governing Law</h2>
      <p>These Terms are governed by the laws of Denmark. Any disputes shall be subject to the exclusive jurisdiction of the Danish courts.</p>
    `,
  },
  shipping: {
    title: "Shipping Policy",
    lastUpdated: "1 March 2025",
    content: `
      <h2>Processing Time</h2>
      <p>Orders are processed within 1–2 business days (Monday–Friday, excluding public holidays). Orders placed on weekends or holidays are processed on the next business day.</p>

      <h2>Standard Shipping</h2>
      <p>Standard delivery within Europe takes 3–5 business days. International delivery takes 7–12 business days. Free standard shipping is available on orders over €75 (Europe) and €120 (international).</p>

      <h2>Express Shipping</h2>
      <p>Express (1–2 business day) delivery is available for most European destinations. Cost is calculated at checkout based on your location and order weight.</p>

      <h2>Tracking</h2>
      <p>All orders include a tracking number sent via email once dispatched. You can track your parcel directly on the carrier's website or via our order tracking page.</p>

      <h2>Lost or Damaged Parcels</h2>
      <p>If your parcel arrives damaged, or if you believe it has been lost, please contact us within 14 days of the estimated delivery date. We will work with our carrier to investigate and, where appropriate, send a replacement or issue a refund.</p>

      <h2>Customs & Import Duties</h2>
      <p>For orders outside the EU, customs duties or import taxes may apply. These are the responsibility of the recipient and are not included in our prices or shipping fees.</p>
    `,
  },
  returns: {
    title: "Returns & Exchanges",
    lastUpdated: "1 March 2025",
    content: `
      <h2>30-Day Return Window</h2>
      <p>We accept returns of unworn, unwashed items in their original condition and packaging within 30 days of delivery. Items returned outside this window, or in a condition suggesting wear, cannot be refunded.</p>

      <h2>How to Return</h2>
      <p>Visit our Returns Portal, enter your order number and email address, select the items you'd like to return, and choose your reason. A prepaid return label will be generated and emailed to you immediately.</p>

      <h2>Refunds</h2>
      <p>Refunds are processed within 5–7 business days of us receiving and inspecting the returned item(s). Funds typically appear in your account within 3–5 additional business days, depending on your bank.</p>

      <h2>Exchanges</h2>
      <p>We offer free size and colour exchanges. Simply start a return and select 'Exchange' instead of refund. Your replacement will be dispatched as soon as the original item is on its way back to us.</p>

      <h2>Sale Items</h2>
      <p>Items purchased during a sale or with a discount code are eligible for exchange or store credit only — not cash refunds.</p>
    `,
  },
};

const POLICY_NAV = [
  { slug: "privacy",  label: "Privacy Policy" },
  { slug: "terms",    label: "Terms & Conditions" },
  { slug: "shipping", label: "Shipping Policy" },
  { slug: "returns",  label: "Returns & Exchanges" },
];

export async function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const policy = POLICIES[params.slug];
  if (!policy) return {};
  return { title: policy.title };
}

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const policy = POLICIES[params.slug];
  if (!policy) notFound();

  return (
    <div className="container-site py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 items-start">

        {/* ── Sidebar nav ── */}
        <aside className="lg:sticky lg:top-24">
          <h2 className="label-caps text-ink-muted mb-4">Policies</h2>
          <nav aria-label="Policy pages">
            <ul className="flex flex-col gap-1">
              {POLICY_NAV.map(({ slug, label }) => (
                <li key={slug}>
                  <Link
                    href={`/policies/${slug}`}
                    className={`
                      block px-3 py-2 rounded text-sm transition-colors duration-150
                      ${params.slug === slug
                        ? "bg-accent-light text-accent font-medium"
                        : "text-ink-muted hover:text-ink hover:bg-surface-sunken"}
                    `}
                    aria-current={params.slug === slug ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* ── Policy content ── */}
        <div>
          <header className="mb-8 pb-6 border-b border-ink-line">
            <h1 className="mb-2">{policy.title}</h1>
            <p className="text-sm text-ink-ghost">Last updated: {policy.lastUpdated}</p>
          </header>

          {/* Prose content from CMS/MDX */}
          <div
            className="prose prose-editorial prose-sm max-w-none
              prose-h2:font-sans prose-h2:text-base prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-3
              prose-p:text-ink-muted prose-p:leading-relaxed
            "
            dangerouslySetInnerHTML={{ __html: policy.content }}
          />

          {/* Contact nudge */}
          <div className="mt-12 p-5 bg-surface-sunken rounded-lg border border-ink-line">
            <p className="text-sm text-ink-muted">
              Questions about this policy?{" "}
              <Link
                href="/contact"
                className="text-accent hover:underline transition-colors font-medium"
              >
                Contact our team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
