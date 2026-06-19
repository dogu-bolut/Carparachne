import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability — Carparachne",
  description:
    "Our commitment to ethical production, sustainable materials, and a circular future. No footnotes. No offsets disguised as progress.",
};

const STATS = [
  { number: "92%", label: "Recycled or natural fibres" },
  { number: "0", label: "Virgin plastic in packaging" },
  { number: "40+", label: "Certified ethical suppliers" },
  { number: "2030", label: "Net-zero target" },
];

const PILLARS = [
  {
    eyebrow: "Materials",
    heading: "Fibres with a future",
    body: "Every fabric is chosen for its long life and low impact — GOTS-certified organic cotton, recycled wool, and Tencel® lyocell from sustainably managed forests.",
    tag: "GOTS Certified",
  },
  {
    eyebrow: "Production",
    heading: "Made with intention",
    body: "Our partners run on 100% renewable energy. We audit every facility annually, paying living wages across all 40 supplier relationships — no exceptions.",
    tag: "Renewable Energy",
  },
  {
    eyebrow: "Circularity",
    heading: "Nothing wasted",
    body: "Return any Carparachne piece when it's worn through. We repair, resell, or responsibly recycle — keeping garments in use and out of landfill, indefinitely.",
    tag: "Take-Back Programme",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] w-full">
      {/* ── Hero ── */}
      {/* Used lg:flex-[1.2] to dynamically fill available space instead of fixed massive paddings */}
      <section className="relative bg-ink text-surface flex flex-col items-center justify-center text-center px-6 py-16 lg:py-0 lg:flex-[1.2] shrink-0 overflow-hidden">
        {/* Subtle green glow from bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 120%, rgba(58,90,64,0.35) 0%, transparent 70%)",
          }}
        />

        <p className="label-caps text-surface/40 mb-4 relative">
          Our Commitment
        </p>
        <h1 className="font-display text-5xl lg:text-7xl font-light tracking-tighter leading-[1.05] text-white max-w-xl mb-5 relative">
          Dressed well.{" "}
          <em className="not-italic text-white/50">Living well.</em>
        </h1>
        <p className="text-sm text-surface/50 max-w-sm leading-relaxed relative">
          We believe a garment should outlast a season — and leave the earth
          better than we found it.
        </p>
      </section>

      {/* ── Stats strip ── */}
      {/* shrink-0 prevents this from getting squished by flexbox */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ number, label }) => (
          <div
            key={label}
            className="flex flex-col justify-center items-center text-center px-4 py-8 lg:py-6"
          >
            <span
              className="font-display font-light tracking-tighter leading-none mb-2"
              style={{ fontSize: "clamp(40px, 4vw, 56px)", color: "#3a5a40" }}
            >
              {number}
            </span>
            <span className="label-caps text-ink-muted text-[10px] sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Three pillars ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:flex-[1.5] shrink-0">
        {PILLARS.map(({ eyebrow, heading, body, tag }, i) => (
          <div
            key={eyebrow}
            className={`flex flex-col justify-center gap-4 p-8 lg:p-10 ${
              i === 1 ? "bg-surface" : "bg-surface-sunken"
            }`}
          >
            {/* Icon dot */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(58,90,64,0.1)" }}
              aria-hidden
            >
              <span
                className="block w-2 h-2 rounded-full"
                style={{ background: "#3a5a40" }}
              />
            </div>

            <p className="label-caps text-ink-muted">{eyebrow}</p>

            <h2 className="font-display text-3xl font-light tracking-tighter leading-tight">
              {heading}
            </h2>

            <p className="text-sm text-ink-muted leading-relaxed">{body}</p>

            <span
              className="mt-auto inline-flex items-center gap-2 text-[10px] font-medium tracking-widest uppercase w-fit rounded-full px-3 py-1.5"
              style={{
                color: "#3a5a40",
                background: "rgba(58,90,64,0.08)",
              }}
            >
              <span
                className="block w-1.5 h-1.5 rounded-full"
                style={{ background: "#3a5a40" }}
                aria-hidden
              />
              {tag}
            </span>
          </div>
        ))}
      </div>

      {/* ── Pledge bar ── */}
      {/* shrink-0 protects this footer block */}
      <div className="bg-ink flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-8 py-8 lg:px-10 lg:py-6 shrink-0">
        <p
          className="font-display font-light tracking-tight text-white leading-snug"
          style={{ fontSize: "clamp(18px, 2vw, 24px)", maxWidth: 520 }}
        >
          We publish a full impact report every year.{" "}
          <em className="not-italic text-white/45">
            No footnotes. No offsets disguised as progress.
          </em>
        </p>
        <a
          href="/impact-report"
          className="label-caps text-white border border-white/25 hover:border-white/50 hover:bg-white/8 transition-all px-6 py-3.5 rounded-sm whitespace-nowrap shrink-0"
        >
          Read the 2024 report →
        </a>
      </div>
    </div>
  );
}
