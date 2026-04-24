import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore our curated collections — timeless garments and objects made with natural materials, slow craft, and considered design.",
};

/* ── Types ── */
type Collection = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  season: string;
  year: number;
  category: CollectionCategory;
  itemCount: number;
  coverImage: { src: string; altText: string };
  accentColor: string; // tailwind bg class for subtle tinting
  isNew?: boolean;
  isFeatured?: boolean;
};

type CollectionCategory = "All" | "Apparel" | "Accessories" | "Home & Linen" | "Archive";

/* ── Static data ── */
const CATEGORIES: CollectionCategory[] = [
  "All",
  "Apparel",
  "Accessories",
  "Home & Linen",
  "Archive",
];

async function getCollections(): Promise<Collection[]> {
  // Replace with: return fetch('/api/collections').then(r => r.json())
  return MOCK_COLLECTIONS;
}

/* ── Page props ── */
type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function CollectionsPage({ searchParams }: Props) {
  const collections = await getCollections();

  const resolvedParams = await searchParams;
  const category = (resolvedParams.category ?? "All") as CollectionCategory;

  const filtered =
    category === "All"
      ? collections
      : collections.filter((c) => c.category === category);

  const featured = filtered.find((c) => c.isFeatured) ?? filtered[0];
  const rest = filtered.filter((c) => c.id !== featured?.id);

  return (
    <div>
      {/* ── Page header ── */}
      <div className="container-site py-12 lg:py-16 border-b border-ink-line">
        <p className="label-caps text-ink-muted mb-3">The Studio</p>
        <h1>Collections</h1>
        <p className="mt-4 text-base text-ink-muted max-w-xl leading-relaxed">
          Each collection is built around a single material, season, or idea — then left to
          develop over time. Nothing here is trend-driven.
        </p>
      </div>

      <div className="container-site py-10 lg:py-14">

        {/* ── Category pills ── */}
        <nav className="flex flex-wrap gap-2 mb-10" aria-label="Collection categories">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={
                cat === "All"
                  ? "/collections"
                  : `/collections?category=${encodeURIComponent(cat)}`
              }
              className={`
                px-4 py-2 rounded-full text-sm border transition-all duration-150
                ${
                  category === cat
                    ? "bg-ink text-white border-ink"
                    : "bg-transparent text-ink-muted border-ink-line hover:border-ink hover:text-ink"
                }
              `}
              aria-current={category === cat ? "page" : undefined}
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* ── Featured collection (hero card) ── */}
        {featured && (
          <Link
            href={`/collections/${featured.slug}`}
            className="group block mb-12 lg:mb-16"
            aria-label={`Explore: ${featured.title}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-surface-raised rounded-xl overflow-hidden border border-ink-line shadow-card-rest hover:shadow-card-hover transition-shadow duration-400">
              {/* Image */}
              <div className="relative aspect-video lg:aspect-[4/3] overflow-hidden">
                <Image
                  src={featured.coverImage.src}
                  alt={featured.coverImage.altText}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo"
                />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  {featured.isNew && (
                    <span className="badge badge-accent">New</span>
                  )}
                  <span className="badge badge-neutral">{featured.category}</span>
                  <span className="text-xs text-ink-ghost">
                    {featured.season} {featured.year} · {featured.itemCount} pieces
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl lg:text-3xl group-hover:text-accent transition-colors duration-200 text-balance">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-ink-ghost mt-1 font-medium tracking-wide uppercase">
                    {featured.subtitle}
                  </p>
                </div>

                <p className="text-base leading-relaxed text-ink-muted line-clamp-3">
                  {featured.description}
                </p>

                <div className="flex items-center gap-2 mt-2 text-sm font-medium text-ink group-hover:text-accent transition-colors duration-200">
                  Explore Collection
                  <svg
                    className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* ── Collections grid ── */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((collection, i) => (
              <CollectionCard key={collection.id} collection={collection} index={i} />
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-muted">No collections in this category yet.</p>
            <Link href="/collections" className="btn-secondary mt-6 inline-flex">
              View All Collections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Collection card ── */
function CollectionCard({
  collection,
  index,
}: {
  collection: Collection;
  index: number;
}) {
  return (
    <article
      className="group animate-fade-up"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <Link href={`/collections/${collection.slug}`} className="block">
        {/* Cover */}
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-sunken mb-4">
          <Image
            src={collection.coverImage.src}
            alt={collection.coverImage.altText}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={75}
            className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out-expo"
          />

          {/* Overlay badges */}
          {collection.isNew && (
            <div className="absolute top-3 left-3">
              <span className="badge badge-accent">New</span>
            </div>
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="badge badge-neutral">{collection.category}</span>
          <span className="text-xs text-ink-ghost">
            {collection.season} {collection.year}
          </span>
          <span className="text-xs text-ink-ghost">·</span>
          <span className="text-xs text-ink-ghost">{collection.itemCount} pieces</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-normal text-ink-soft leading-snug mb-1 group-hover:text-accent transition-colors duration-200 line-clamp-2">
          {collection.title}
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-ink-ghost uppercase tracking-wide font-medium mb-2">
          {collection.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm text-ink-muted leading-relaxed line-clamp-2">
          {collection.description}
        </p>
      </Link>
    </article>
  );
}

/* ── Mock data ── */
const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "1",
    slug: "spring-linen-2026",
    title: "Spring Linen",
    subtitle: "SS26 — The Light Collection",
    description:
      "Woven from Portuguese stonewashed linen, this season's garments are designed for warmth without weight — loose silhouettes that move with the body and soften further with every wash.",
    season: "Spring",
    year: 2026,
    category: "Apparel",
    itemCount: 14,
    coverImage: {
      src: "/images/collection-spring-linen.jpg",
      altText: "Linen draped garments in ivory and sand tones",
    },
    accentColor: "bg-amber-50",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    slug: "workshop-ceramics-2026",
    title: "Workshop Ceramics",
    subtitle: "Home Series — Vol. III",
    description:
      "Functional objects made by hand in our Lisbon studio. Each piece is thrown on the wheel, glazed with natural ash glazes, and fired at high temperature for durability that outlasts trends.",
    season: "Ongoing",
    year: 2026,
    category: "Home & Linen",
    itemCount: 9,
    coverImage: {
      src: "/images/collection-ceramics.jpg",
      altText: "Stoneware bowls and cups on a stone surface",
    },
    accentColor: "bg-stone-50",
    isNew: true,
  },
  {
    id: "3",
    slug: "autumn-wool-2025",
    title: "Autumn Wool",
    subtitle: "AW25 — The Warmth Collection",
    description:
      "Heavy-gauge merino and a Scottish Harris tweed collaboration. Structured coats, relaxed trousers, and the softest roll-neck you will own.",
    season: "Autumn",
    year: 2025,
    category: "Apparel",
    itemCount: 18,
    coverImage: {
      src: "/images/collection-wool.jpg",
      altText: "Wool coats hanging in a stone archway",
    },
    accentColor: "bg-orange-50",
  },
  {
    id: "4",
    slug: "table-linen-collection",
    title: "Table & Bed Linen",
    subtitle: "Home Series — Foundational",
    description:
      "Stonewashed linen in seven undyed and naturally dyed colourways. Designed to live on your table and bed for decades, not seasons.",
    season: "Perennial",
    year: 2024,
    category: "Home & Linen",
    itemCount: 22,
    coverImage: {
      src: "/images/collection-table-linen.jpg",
      altText: "Linen tablecloth set with simple ceramic ware",
    },
    accentColor: "bg-lime-50",
  },
  {
    id: "5",
    slug: "leather-goods-2025",
    title: "Leather Goods",
    subtitle: "Accessories — Vegetable Tanned",
    description:
      "Belts, wallets, and bags cut from full-grain vegetable-tanned leather. No hardware polish, no coating — just leather that ages to a patina unique to its owner.",
    season: "Ongoing",
    year: 2025,
    category: "Accessories",
    itemCount: 11,
    coverImage: {
      src: "/images/collection-leather.jpg",
      altText: "Tan leather bag on a wooden workshop bench",
    },
    accentColor: "bg-yellow-50",
  },
  {
    id: "6",
    slug: "archive-summer-2023",
    title: "Summer Linen Archive",
    subtitle: "SS23 — Final Stock",
    description:
      "Select pieces from our 2023 summer collection, offered at reduced price while stock lasts. Same quality, same provenance — just a season older.",
    season: "Summer",
    year: 2023,
    category: "Archive",
    itemCount: 6,
    coverImage: {
      src: "/images/collection-archive.jpg",
      altText: "Folded linen garments in warm afternoon light",
    },
    accentColor: "bg-gray-50",
  },
];
