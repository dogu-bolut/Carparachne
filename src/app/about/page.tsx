import type { Metadata } from "next";
import Image from "next/image";
import type { TeamMember } from "@/lib/types";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We believe in the enduring value of quality craft. Learn about our story, mission, and the people behind Atelier.",
};

/* ── Static data — replace with CMS in production ── */
const STORY_BLOCKS: Array<{
  eyebrow: string;
  heading: string;
  body:    string;
  image:   string;
  imageAlt:string;
  reverse: boolean;
}> = [
  {
    eyebrow:  "Our Beginning",
    heading:  "Born from a love\nof enduring craft",
    body:     "Atelier began in 2018 in a small studio in Copenhagen — a single room stacked with sample fabrics, sketches, and the firm belief that the things we choose to surround ourselves with should be made with intention. We were tired of fast cycles and fleeting trends. We wanted objects and garments that would earn a place in your life, not just your wardrobe.",
    image:    "/images/about-studio.jpg",
    imageAlt: "The original Atelier studio — white walls, warm natural light, fabric swatches",
    reverse:  false,
  },
  {
    eyebrow:  "Our Philosophy",
    heading:  "Less, but\nbetter",
    body:     "We source materials directly from family-run mills across Portugal, Japan, and Peru — partners we visit twice a year and work with on long-term contracts. Every product passes through a 28-point quality review before it reaches you. We deliberately keep our range small; each piece earns its place. If something doesn't justify its existence, we don't make it.",
    image:    "/images/about-sourcing.jpg",
    imageAlt: "Natural linen fabric being inspected in a Portuguese textile mill",
    reverse:  true,
  },
  {
    eyebrow:  "Our Commitment",
    heading:  "Sustainability\nas practice",
    body:     "For us, sustainability isn't a marketing claim — it's a design constraint. We use certified organic and recycled materials wherever possible, work exclusively with carbon-neutral shipping partners, and publish an annual impact report with full supply-chain transparency. Our packaging is entirely compostable.",
    image:    "/images/about-sustainability.jpg",
    imageAlt: "Compostable packaging and certified organic cotton labels",
    reverse:  false,
  },
];

const TEAM: TeamMember[] = [
  {
    id: "1", name: "Lena Hartmann", role: "Founder & Creative Director",
    bio: "Former textile engineer turned designer. Lena's obsession with material science shapes every product decision.",
    image: { id: "t1", src: "/images/team-lena.jpg", altText: "Lena Hartmann", width: 400, height: 400 },
    socials: { instagram: "https://instagram.com", linkedin: "https://linkedin.com" },
  },
  {
    id: "2", name: "Marcus Veil", role: "Head of Sourcing",
    bio: "Marcus has spent 15 years building relationships with the world's finest material producers.",
    image: { id: "t2", src: "/images/team-marcus.jpg", altText: "Marcus Veil", width: 400, height: 400 },
    socials: { linkedin: "https://linkedin.com" },
  },
  {
    id: "3", name: "Priya Nair", role: "Head of Product",
    bio: "Priya brings a human-centred design approach to every piece, obsessing over fit, function and feel.",
    image: { id: "t3", src: "/images/team-priya.jpg", altText: "Priya Nair", width: 400, height: 400 },
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "4", name: "Tobias Renn", role: "Operations & Sustainability",
    bio: "Tobias built our supply chain from scratch and holds us accountable to every sustainability promise we make.",
    image: { id: "t4", src: "/images/team-tobias.jpg", altText: "Tobias Renn", width: 400, height: 400 },
    socials: { linkedin: "https://linkedin.com" },
  },
];

const STATS = [
  { value: "2018",  label: "Founded" },
  { value: "24",    label: "Supplier Partners" },
  { value: "100%",  label: "Compostable Packaging" },
  { value: "~12",   label: "New Styles per Year" },
];

export default function AboutPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="Atelier studio — the starting point of every product"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 to-ink/20" aria-hidden />
        <div className="relative z-raised h-full flex items-end">
          <div className="container-site pb-14">
            <p className="label-caps text-white/70 mb-3 animate-fade-up" style={{ animationDelay: "100ms" }}>
              Our Story
            </p>
            <h1
              className="text-white max-w-2xl text-balance animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              Made with intention.<br />
              <em className="font-light italic">Built to last.</em>
            </h1>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="bg-surface-raised border-b border-ink-line">
        <div className="container-site py-8">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <dt className="font-display text-3xl lg:text-4xl font-light text-ink-soft mb-1">
                  {value}
                </dt>
                <dd className="label-caps text-ink-ghost">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── Alternating story blocks ── */}
      <div className="section-lg">
        {STORY_BLOCKS.map((block, i) => (
          <div
            key={i}
            className={`
              container-site mb-20 last:mb-0
              grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center
            `}
          >
            {/* Text */}
            <div className={`flex flex-col gap-5 ${block.reverse ? "lg:order-2" : ""}`}>
              <p className="label-caps text-accent">{block.eyebrow}</p>
              <h2 className="whitespace-pre-line">{block.heading}</h2>
              <p className="text-base leading-relaxed text-ink-muted max-w-prose">
                {block.body}
              </p>
            </div>

            {/* Image */}
            <div className={`${block.reverse ? "lg:order-1" : ""}`}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={block.image}
                  alt={block.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Mission statement ── */}
      <section className="bg-ink text-white py-20 lg:py-28" aria-label="Mission">
        <div className="container-site text-center max-w-3xl mx-auto">
          <p className="label-caps text-white/50 mb-6">Our Mission</p>
          <blockquote className="font-display text-2xl lg:text-4xl xl:text-5xl font-light leading-tight text-balance italic">
            "To make only things worth making — and to make them as well as they can be made."
          </blockquote>
          <p className="mt-8 text-white/60 text-base">
            — Lena Hartmann, Founder
          </p>
        </div>
      </section>

      {/* ── Team grid ── */}
      <section className="section-md" aria-labelledby="team-heading">
        <div className="container-site">
          <header className="text-center mb-12 lg:mb-16">
            <p className="label-caps text-ink-muted mb-3">The People</p>
            <h2 id="team-heading">Meet the Team</h2>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {TEAM.map((member, i) => (
              <article
                key={member.id}
                className="group animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Photo */}
                <div className="relative aspect-square rounded-lg overflow-hidden bg-surface-sunken mb-4">
                  <Image
                    src={member.image.src}
                    alt={member.image.altText}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    quality={80}
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-sans text-sm font-semibold text-ink-soft">
                  {member.name}
                </h3>
                <p className="label-caps text-ink-ghost mt-0.5 mb-2">{member.role}</p>
                <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
