import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { TeamMember } from "@/lib/types";

// ── Dynamic Server Metadata ──────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AboutPage() {
  const t = useTranslations("About");

  // ── Construct layout arrays using translation keys ─────────────────────────
  const STATS = [
    { value: t("stats.founded.value"), label: t("stats.founded.label") },
    { value: t("stats.partners.value"), label: t("stats.partners.label") },
    { value: t("stats.packaging.value"), label: t("stats.packaging.label") },
    { value: t("stats.styles.value"), label: t("stats.styles.label") },
  ];

  const STORY_BLOCKS = [
    {
      eyebrow: t("stories.beginning.eyebrow"),
      heading: t("stories.beginning.heading"),
      body: t("stories.beginning.body"),
      image: "/images/about-studio.jpg",
      imageAlt:
        "The original Carparachne studio — white walls, warm natural light, fabric swatches",
      reverse: false,
    },
    {
      eyebrow: t("stories.philosophy.eyebrow"),
      heading: t("stories.philosophy.heading"),
      body: t("stories.philosophy.body"),
      image: "/images/about-sourcing.jpg",
      imageAlt:
        "Natural linen fabric being inspected in a Portuguese textile mill",
      reverse: true,
    },
    {
      eyebrow: t("stories.commitment.eyebrow"),
      heading: t("stories.commitment.heading"),
      body: t("stories.commitment.body"),
      image: "/images/about-sustainability.jpg",
      imageAlt: "Compostable packaging and certified organic cotton labels",
      reverse: false,
    },
  ];

  const TEAM = [
    {
      id: "1",
      name: "Lena Hartmann",
      role: t("team.lena.role"),
      bio: t("team.lena.bio"),
      image: {
        src: "/images/team-lena.jpg",
        altText: "Lena Hartmann",
        width: 400,
        height: 400,
      },
    },
    {
      id: "2",
      name: "Marcus Veil",
      role: t("team.marcus.role"),
      bio: t("team.marcus.bio"),
      image: {
        src: "/images/team-marcus.jpg",
        altText: "Marcus Veil",
        width: 400,
        height: 400,
      },
    },
    {
      id: "3",
      name: "Priya Nair",
      role: t("team.priya.role"),
      bio: t("team.priya.bio"),
      image: {
        src: "/images/team-priya.jpg",
        altText: "Priya Nair",
        width: 400,
        height: 400,
      },
    },
    {
      id: "4",
      name: "Tobias Renn",
      role: t("team.tobias.role"),
      bio: t("team.tobias.bio"),
      image: {
        src: "/images/team-tobias.jpg",
        altText: "Tobias Renn",
        width: 400,
        height: 400,
      },
    },
  ];

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="Carparachne studio — the starting point of every product"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/50 to-ink/20"
          aria-hidden
        />
        <div className="relative z-raised h-full flex items-end">
          <div className="container-site pb-14">
            <p
              className="label-caps text-white/70 mb-3 animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              {t("hero.eyebrow")}
            </p>
            <h1
              className="text-white max-w-2xl text-balance animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              {t("hero.headingLine1")}
              <br />
              <em className="font-light italic">{t("hero.headingLine2")}</em>
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
            className={`container-site mb-20 last:mb-0 grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center`}
          >
            <div
              className={`flex flex-col gap-5 ${block.reverse ? "lg:order-2" : ""}`}
            >
              <p className="label-caps text-accent">{block.eyebrow}</p>
              <h2 className="whitespace-pre-line">{block.heading}</h2>
              <p className="text-base leading-relaxed text-ink-muted max-w-prose">
                {block.body}
              </p>
            </div>

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
      <section
        className="bg-ink text-white py-20 lg:py-28"
        aria-label="Mission"
      >
        <div className="container-site text-center max-w-3xl mx-auto">
          <p className="label-caps text-white/50 mb-6">
            {t("mission.eyebrow")}
          </p>
          <blockquote className="font-display text-2xl lg:text-4xl xl:text-5xl font-light leading-tight text-balance italic">
            {t("mission.quote")}
          </blockquote>
          <p className="mt-8 text-white/60 text-base">{t("mission.author")}</p>
        </div>
      </section>

      {/* ── Team grid ── */}
      <section className="section-md" aria-labelledby="team-heading">
        <div className="container-site">
          <header className="text-center mb-12 lg:mb-16">
            <p className="label-caps text-ink-muted mb-3">
              {t("teamSection.eyebrow")}
            </p>
            <h2 id="team-heading">{t("teamSection.heading")}</h2>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {TEAM.map((member, i) => (
              <article
                key={member.id}
                className="group animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
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
                <p className="label-caps text-ink-ghost mt-0.5 mb-2">
                  {member.role}
                </p>
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
