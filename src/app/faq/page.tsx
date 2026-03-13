// src/app/faq/page.tsx
// ─── FAQ page: search bar + categorized accordion groups ────────────────────

import type { Metadata } from "next";
import { FaqAccordion } from "@/components/shared/faqAccordion";
import type { FaqItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the most common questions about orders, shipping, returns, and our products.",
};

const FAQ_DATA: Array<{ category: string; items: FaqItem[] }> = [
  {
    category: "Orders & Payment",
    items: [
      {
        id: "o1", category: "Orders & Payment",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, and PayPal. All transactions are processed securely via Stripe.",
      },
      {
        id: "o2", category: "Orders & Payment",
        question: "Can I change or cancel my order after placing it?",
        answer: "Orders can be amended or cancelled within 1 hour of placement. After that, fulfilment begins and changes may no longer be possible. Please contact us immediately at hello@atelier.com.",
      },
      {
        id: "o3", category: "Orders & Payment",
        question: "Will I receive an order confirmation?",
        answer: "Yes — a confirmation email is sent immediately after checkout, followed by a dispatch notification with tracking details once your order has shipped.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        id: "s1", category: "Shipping & Delivery",
        question: "How long does delivery take?",
        answer: "Standard delivery takes 3–5 business days within Europe and 7–12 business days for international orders. Express (1–2 day) shipping is available at checkout for most destinations.",
      },
      {
        id: "s2", category: "Shipping & Delivery",
        question: "Do you offer free shipping?",
        answer: "Yes — orders over €75 qualify for free standard shipping to all EU countries. International free shipping is available on orders over €120.",
      },
      {
        id: "s3", category: "Shipping & Delivery",
        question: "How can I track my order?",
        answer: "Once dispatched, you'll receive a tracking link via email. You can also track your order at any time by visiting our order tracking page and entering your order number and email address.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        id: "r1", category: "Returns & Exchanges",
        question: "What is your return policy?",
        answer: "We offer free returns within 30 days of delivery for unworn, unwashed items in their original packaging. Sale items are eligible for exchange or store credit only.",
      },
      {
        id: "r2", category: "Returns & Exchanges",
        question: "How do I start a return?",
        answer: "Visit our Returns Portal at atelier.com/returns, enter your order number and email, and follow the prompts. A prepaid return label will be emailed to you within a few minutes.",
      },
      {
        id: "r3", category: "Returns & Exchanges",
        question: "How long does a refund take?",
        answer: "Once we receive and inspect your return (usually 2–3 business days after we receive it), refunds are issued within 5–7 business days to your original payment method.",
      },
    ],
  },
  {
    category: "Products & Sizing",
    items: [
      {
        id: "p1", category: "Products & Sizing",
        question: "How does your sizing work?",
        answer: "Our garments are sized in EU standards (36–46). Each product page includes a detailed size guide with measurements in both cm and inches. If you're between sizes, we generally recommend sizing up for a relaxed fit.",
      },
      {
        id: "p2", category: "Products & Sizing",
        question: "Are your materials certified?",
        answer: "Yes. All our natural fibres carry GOTS (Global Organic Textile Standard) certification. Our wool products are mulesing-free and certified by the Responsible Wool Standard (RWS).",
      },
      {
        id: "p3", category: "Products & Sizing",
        question: "How should I care for my Atelier pieces?",
        answer: "Each product includes specific care instructions on its label and product page. Generally, we recommend cold machine wash or hand wash for most items, and line drying away from direct sunlight to preserve colour and shape.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-surface-raised border-b border-ink-line">
        <div className="container-site py-12 lg:py-16">
          <p className="label-caps text-ink-muted mb-3">Help Centre</p>
          <h1>Frequently Asked Questions</h1>
          <p className="mt-4 text-base text-ink-muted max-w-lg">
            Can't find what you're looking for?{" "}
            <a href="/contact" className="underline underline-offset-2 hover:text-accent transition-colors">
              Contact us
            </a>{" "}
            and we'll respond within one business day.
          </p>
        </div>
      </div>

      <div className="container-site py-12 lg:py-16 max-w-[800px]">

        {/* Category sections */}
        <div className="flex flex-col gap-12">
          {FAQ_DATA.map((group) => (
            <section key={group.category} aria-labelledby={`faq-${group.category}`}>
              <h2
                id={`faq-${group.category}`}
                className="font-sans text-base font-semibold text-ink-soft mb-4 pb-4 border-b border-ink-line"
              >
                {group.category}
              </h2>
              <FaqAccordion items={group.items} />
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-surface-sunken rounded-xl p-8 text-center border border-ink-line">
          <h3 className="font-sans font-semibold text-ink-soft mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-ink-muted mb-5">
            Our team is available Monday to Friday, 9am–5pm CET.
          </p>
          <a href="/contact" className="btn-primary inline-flex">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
