import type { Metadata } from "next";
import { ContactForm } from "@/components/shared/contactForm";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Carparachne team. We typically respond within one business day.",
};

const CONTACT_INFO = [
  {
    Icon: Mail,
    label: "Email",
    value: "dogubolut@gmail.com",
    href:  "mailto:dogubolut@gmail.com",
  },
  {
    Icon: Clock,
    label: "Response Time",
    value: "Within 1 business day",
    href:  null,
  },
  {
    Icon: MapPin,
    label: "Studio",
    value: "Vesterbrogade 12, Copenhagen, Denmark",
    href:  null,
  },
  {
    Icon: MessageSquare,
    label: "Live Chat",
    value: "Available Mon–Fri, 9am–5pm CET",
    href:  null,
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* ── Header ── */}
      <div className="bg-surface-raised border-b border-ink-line">
        <div className="container-site py-12 lg:py-16">
          <p className="label-caps text-ink-muted mb-3">Get in Touch</p>
          <h1>Contact Us</h1>
          <p className="mt-4 text-base text-ink-muted max-w-md">
            Questions about an order, a product, or just want to say hello? We're here.
          </p>
        </div>
      </div>

      <div className="container-site py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 xl:gap-20 items-start">

          {/* ── Left: contact info ── */}
          <aside>
            <ul className="flex flex-col gap-7">
              {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-accent" />
                  </div>
                  <div>
                    <p className="label-caps text-ink-ghost mb-1">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-ink-soft hover:text-accent transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-ink-muted">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* FAQ nudge */}
            <div className="mt-10 p-5 bg-surface-sunken rounded-lg border border-ink-line">
              <h3 className="font-sans font-semibold text-sm text-ink-soft mb-2">
                Looking for quick answers?
              </h3>
              <p className="text-sm text-ink-muted mb-4">
                Our FAQ covers shipping, returns, sizing, and more.
              </p>
              <a href="/faq" className="btn-secondary text-sm py-2 px-4 inline-flex">
                Browse the FAQ
              </a>
            </div>
          </aside>

          {/* ── Right: form ── */}
          <div className="bg-surface-raised rounded-xl border border-ink-line p-8 lg:p-10">
            <h2 className="font-sans text-xl font-semibold text-ink-soft mb-7">
              Send us a message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
