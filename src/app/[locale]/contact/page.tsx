import type { Metadata } from "next";
import { ContactForm } from "@/components/shared/contactForm";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react";

// ── Dynamic Server Metadata ──────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const CONTACT_INFO_KEYS = [
  { key: "email", Icon: Mail, href: "mailto:support@carparachne.com" },
  { key: "responseTime", Icon: Clock, href: null },
  { key: "studio", Icon: MapPin, href: null },
  { key: "liveChat", Icon: MessageSquare, href: null },
];

export default async function ContactPage() {
  const t = await getTranslations("Contact");

  return (
    <div>
      {/* ── Header ── */}
      <div className="bg-surface-raised border-b border-ink-line">
        <div className="container-site py-12 lg:py-16">
          <p className="label-caps text-ink-muted mb-3">{t("header.eyebrow")}</p>
          <h1>{t("header.title")}</h1>
          <p className="mt-4 text-base text-ink-muted max-w-md">
            {t("header.subtitle")}
          </p>
        </div>
      </div>

      <div className="container-site py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 xl:gap-20 items-start">

          {/* ── Left: contact info ── */}
          <aside>
            <ul className="flex flex-col gap-7">
              {CONTACT_INFO_KEYS.map(({ key, Icon, href }) => (
                <li key={key} className="flex gap-4">
                  <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-accent" />
                  </div>
                  <div>
                    <p className="label-caps text-ink-ghost mb-1">{t(`info.${key}.label`)}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-ink-soft hover:text-accent transition-colors"
                      >
                        {t(`info.${key}.value`)}
                      </a>
                    ) : (
                      <p className="text-sm text-ink-muted">{t(`info.${key}.value`)}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* FAQ nudge */}
            <div className="mt-10 p-5 bg-surface-sunken rounded-lg border border-ink-line">
              <h3 className="font-sans font-semibold text-sm text-ink-soft mb-2">
                {t("faq.title")}
              </h3>
              <p className="text-sm text-ink-muted mb-4">
                {t("faq.description")}
              </p>
              <a href="/faq" className="btn-secondary text-sm py-2 px-4 inline-flex">
                {t("faq.cta")}
              </a>
            </div>
          </aside>

          {/* ── Right: form ── */}
          <div className="bg-surface-raised rounded-xl border border-ink-line p-8 lg:p-10">
            <h2 className="font-sans text-xl font-semibold text-ink-soft mb-7">
              {t("form.heading")}
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
