import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Package, Tag, ArrowLeft } from "lucide-react";

import { ProductCard } from "@/components/shared/productCard";
import { MOCK_PRODUCTS } from "@/lib/mock/mockProducts";

/* ── Types ── */
type Collection = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  season: string;
  year: number;
  category: string;
  categorySlug: string;
  itemCount: number;
  coverImage: { src: string; altText: string };
  galleryImages?: { src: string; altText: string }[];
  productSlugs: string[];
  isNew?: boolean;
  materials?: string[];
  careInstructions?: string;
};

/* ── Mock data — mirrors the index page exactly ── */
const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "1", slug: "spring-linen-2026",
    title: "Spring Linen",
    subtitle: "SS26 — The Light Collection",
    description:
      "Woven from Portuguese stonewashed linen, this season's garments are designed for warmth without weight — loose silhouettes that move with the body and soften further with every wash.",
    longDescription:
      "We spent three days at the Alentejo mills choosing this season's weights and weaves. The result is a linen that starts soft and only improves. Every piece in this collection is cut to be worn loosely, layered without bulk, and lived in without care.\n\nThe palette this year is drawn from the Portuguese landscape in early spring: chalk walls, dry grass, the pale grey of aged cork. Nothing was dyed that didn't need to be.",
    season: "Spring", year: 2026, category: "Apparel", categorySlug: "apparel", itemCount: 14, isNew: true,
    coverImage: { src: "/images/collection-spring-linen.jpg", altText: "Linen draped garments in ivory and sand tones" },
    galleryImages: [
      { src: "/images/collection-spring-linen-2.jpg", altText: "Linen shirt on wooden hanger" },
      { src: "/images/collection-spring-linen-3.jpg", altText: "Detail of stonewashed linen texture" },
    ],
    productSlugs: ["the-linen-overshirt", "merino-crewneck"],
    materials: ["100% Portuguese Linen", "Stonewashed finish", "Natural undyed colourways"],
    careInstructions: "Machine wash 30°C. Tumble dry low. Iron damp on medium.",
  },
  {
    id: "2", slug: "workshop-ceramics-2026",
    title: "Workshop Ceramics",
    subtitle: "Home Series — Vol. III",
    description:
      "Functional objects made by hand in our Lisbon studio. Each piece is thrown on the wheel, glazed with natural ash glazes, and fired at high temperature for durability that outlasts trends.",
    longDescription:
      "Every mug, bowl, and vessel in this collection was made in our Lisbon workshop between January and March 2026. We work with a single studio potter who trained in Japan and now splits her time between Lisbon and the Alentejo.\n\nAsh glazes are unpredictable. No two pieces come out the same. We consider this a feature.",
    season: "Ongoing", year: 2026, category: "Home & Living", categorySlug: "home-and-living", itemCount: 9, isNew: true,
    coverImage: { src: "/images/collection-ceramics.jpg", altText: "Stoneware bowls and cups on a stone surface" },
    galleryImages: [
      { src: "/images/collection-ceramics-2.jpg", altText: "Close-up of ash glaze on stoneware" },
    ],
    productSlugs: ["ceramic-mug-set"],
    materials: ["Stoneware clay", "Natural ash glazes", "High-fire kiln"],
    careInstructions: "Dishwasher and microwave safe. Avoid thermal shock.",
  },
  {
    id: "3", slug: "autumn-wool-2025",
    title: "Autumn Wool",
    subtitle: "AW25 — The Warmth Collection",
    description:
      "Heavy-gauge merino and a Scottish Harris tweed collaboration. Structured coats, relaxed trousers, and the softest roll-neck you will own.",
    longDescription:
      "This collection was two years in the making. We partnered with a fourth-generation Harris Tweed weaver on the Isle of Harris to develop a cloth that sits between classic tweed and something more contemporary — still handwoven on a treadle loom, still certified, but with a weight and handle that feels right for now.\n\nThe merino pieces use an extra-fine 17.5 micron fibre sourced from a single estate in Patagonia.",
    season: "Autumn", year: 2025, category: "Apparel", categorySlug: "apparel", itemCount: 18,
    coverImage: { src: "/images/collection-wool.jpg", altText: "Wool coats hanging in a stone archway" },
    galleryImages: [],
    productSlugs: ["merino-crewneck", "wool-blanket"],
    materials: ["Extra-fine merino (17.5μ)", "Harris Tweed (certified)", "Fully lined"],
    careInstructions: "Dry clean or hand wash cold. Reshape and dry flat.",
  },
  {
    id: "4", slug: "table-linen-collection",
    title: "Table & Bed Linen",
    subtitle: "Home Series — Foundational",
    description:
      "Stonewashed linen in seven undyed and naturally dyed colourways. Designed to live on your table and bed for decades, not seasons.",
    longDescription:
      "This is the collection we return to every year. Nothing changes — the weight, the weave, the seven colourways. We consider it finished.\n\nThe linen is woven in Portugal, stonewashed in Belgium, and packaged in recycled kraft at our studio. No plastic, no synthetic dyes in the undyed range.",
    season: "Perennial", year: 2024, category: "Home & Living", categorySlug: "home-and-living", itemCount: 22,
    coverImage: { src: "/images/collection-table-linen.jpg", altText: "Linen tablecloth set with simple ceramic ware" },
    galleryImages: [],
    productSlugs: ["bamboo-candle", "ceramic-mug-set"],
    materials: ["100% Belgian flax linen", "Stonewashed", "OEKO-TEX® certified"],
    careInstructions: "Machine wash 60°C. Tumble dry. Softer with every wash.",
  },
  {
    id: "5", slug: "leather-goods-2025",
    title: "Leather Goods",
    subtitle: "Accessories — Vegetable Tanned",
    description:
      "Belts, wallets, and bags cut from full-grain vegetable-tanned leather. No hardware polish, no coating — just leather that ages to a patina unique to its owner.",
    longDescription:
      "Vegetable tanning takes 60 days. Chrome tanning takes 24 hours. We use vegetable-tanned leather from a tannery in Tuscany that has been using the same oak bark pits since 1580.\n\nEvery piece is cut and stitched by hand in our Porto workshop. We do not use machines for stitching. The result is a product that will outlast almost anything else in your wardrobe.",
    season: "Ongoing", year: 2025, category: "Accessories", categorySlug: "accessories", itemCount: 11,
    coverImage: { src: "/images/collection-leather.jpg", altText: "Tan leather bag on a wooden workshop bench" },
    galleryImages: [],
    productSlugs: ["leather-card-holder", "canvas-tote"],
    materials: ["Full-grain vegetable-tanned leather", "Tuscany tannery", "Linen thread"],
    careInstructions: "Condition with natural beeswax. Keep away from prolonged moisture.",
  },
  {
    id: "6", slug: "archive-summer-2023",
    title: "Summer Linen Archive",
    subtitle: "SS23 — Final Stock",
    description:
      "Select pieces from our 2023 summer collection, offered at reduced price while stock lasts. Same quality, same provenance — just a season older.",
    longDescription:
      "We make a point of selling through our archive honestly — no artificial urgency, no flash sales. These pieces are here because they're genuinely good and genuinely reduced. When they're gone, they're gone.\n\nAll archive items ship within 48 hours from our Lisbon warehouse.",
    season: "Summer", year: 2023, category: "Archive", categorySlug: "archive", itemCount: 6,
    coverImage: { src: "/images/collection-archive.jpg", altText: "Folded linen garments in warm afternoon light" },
    galleryImages: [],
    productSlugs: ["the-linen-overshirt", "silk-scarf"],
    materials: ["100% Portuguese linen", "Natural dyes"],
    careInstructions: "Machine wash 30°C. Line dry.",
  },
];

/* ── Metadata ── */
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = MOCK_COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: `${collection.title} — ${collection.subtitle}`,
    description: collection.description,
  };
}

export function generateStaticParams() {
  return MOCK_COLLECTIONS.map((c) => ({ slug: c.slug }));
}

/* ── Page ── */
export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = MOCK_COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) notFound();

  const collectionProducts = MOCK_PRODUCTS.filter((p) =>
    collection.productSlugs.includes(p.slug)
  );

  // Other collections for the "More Collections" strip
  const otherCollections = MOCK_COLLECTIONS.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <div>
      {/* ── Breadcrumb ── */}
      <div className="container-site pt-6 pb-0">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-xs text-ink-ghost flex-wrap">
            <li><Link href="/" className="hover:text-ink transition-colors">Home</Link></li>
            <li aria-hidden><ChevronRight size={12} className="text-ink-line" /></li>
            <li><Link href="/collections" className="hover:text-ink transition-colors">Collections</Link></li>
            <li aria-hidden><ChevronRight size={12} className="text-ink-line" /></li>
            <li className="text-ink-muted" aria-current="page">{collection.title}</li>
          </ol>
        </nav>
      </div>

      {/* ── Hero ── */}
      <div className="container-site py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — cover image + gallery strip */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-sunken">
              <Image
                src={collection.coverImage.src}
                alt={collection.coverImage.altText}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                className="object-cover"
              />
              {collection.isNew && (
                <div className="absolute top-4 left-4">
                  <span className="badge badge-accent">New</span>
                </div>
              )}
            </div>

            {/* Gallery thumbnails */}
            {collection.galleryImages && collection.galleryImages.length > 0 && (
              <div className="flex gap-3">
                {/* Active thumb (cover) */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-ink flex-shrink-0 bg-surface-sunken">
                  <Image
                    src={collection.coverImage.src}
                    alt={collection.coverImage.altText}
                    fill sizes="80px"
                    className="object-cover"
                  />
                </div>
                {collection.galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 rounded-lg overflow-hidden border border-ink-line flex-shrink-0 bg-surface-sunken opacity-70 hover:opacity-100 transition-opacity duration-150 cursor-pointer"
                  >
                    <Image
                      src={img.src}
                      alt={img.altText}
                      fill sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — info */}
          <div className="flex flex-col gap-6 lg:pt-2">

            {/* Category + season */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="badge badge-neutral">{collection.category}</span>
              <span className="text-xs text-ink-ghost">
                {collection.season} {collection.year}
              </span>
              <span className="text-xs text-ink-ghost">·</span>
              <span className="text-xs text-ink-ghost flex items-center gap-1">
                <Package size={11} />
                {collection.itemCount} pieces
              </span>
            </div>

            {/* Titles */}
            <div>
              <h1 className="text-3xl lg:text-4xl text-balance mb-2">
                {collection.title}
              </h1>
              <p className="text-sm text-ink-ghost uppercase tracking-widest font-medium">
                {collection.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-base text-ink-muted leading-relaxed">
              {collection.description}
            </p>

            {/* Long description */}
            {collection.longDescription && (
              <div className="border-t border-ink-line pt-5">
                {collection.longDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm text-ink-muted leading-relaxed mb-3 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Materials */}
            {collection.materials && collection.materials.length > 0 && (
              <div className="border-t border-ink-line pt-5">
                <p className="label-caps text-ink-soft mb-3 flex items-center gap-2">
                  <Tag size={12} />
                  Materials & Provenance
                </p>
                <ul className="flex flex-col gap-1.5">
                  {collection.materials.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm text-ink-muted">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-ink-ghost flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Care */}
            {collection.careInstructions && (
              <div className="border-t border-ink-line pt-5">
                <p className="label-caps text-ink-soft mb-2">Care</p>
                <p className="text-sm text-ink-muted">{collection.careInstructions}</p>
              </div>
            )}

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/shop?categories=${collection.categorySlug.toLowerCase().replace(/\s/g, "-")}`}
                className="btn-primary flex-1 text-center"
              >
                Shop This Collection
              </Link>
              <Link href="/collections" className="btn-secondary flex items-center gap-2 justify-center">
                <ArrowLeft size={14} />
                All Collections
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Products in this collection ── */}
      {collectionProducts.length > 0 && (
        <div className="border-t border-ink-line">
          <div className="container-site py-10 lg:py-14">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="label-caps text-ink-muted mb-2">From This Collection</p>
                <h2 className="text-2xl">
                  Featured Pieces
                </h2>
              </div>
              <Link
                href={`/shop?categories=${collection.categorySlug.toLowerCase().replace(/\s/g, "-")}`}
                className="text-sm text-ink-muted hover:text-accent underline underline-offset-2 transition-colors hidden sm:block"
              >
                View all {collection.itemCount} pieces
              </Link>
            </div>

            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
              role="list"
              aria-label="Products in this collection"
            >
              {collectionProducts.map((product, i) => (
                <div key={product.id} role="listitem">
                  <ProductCard product={product} index={i} />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href={`/shop?categories=${collection.categorySlug.toLowerCase().replace(/\s/g, "-")}`}
                className="btn-secondary inline-flex"
              >
                View all {collection.itemCount} pieces
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── More collections ── */}
      {otherCollections.length > 0 && (
        <div className="border-t border-ink-line bg-surface-raised">
          <div className="container-site py-10 lg:py-14">
            <p className="label-caps text-ink-muted mb-2">Explore Further</p>
            <h2 className="text-2xl mb-8">More Collections</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-8">
              {otherCollections.map((col, i) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.slug}`}
                  className="group animate-fade-up"
                  style={{ animationDelay: `${i * 75}ms` }}
                >
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-sunken mb-4">
                    <Image
                      src={col.coverImage.src}
                      alt={col.coverImage.altText}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      quality={70}
                      className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out-expo"
                    />
                    {col.isNew && (
                      <div className="absolute top-3 left-3">
                        <span className="badge badge-accent">New</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="badge badge-neutral">{col.category}</span>
                    <span className="text-xs text-ink-ghost">{col.season} {col.year}</span>
                  </div>
                  <h3 className="font-display text-lg font-normal text-ink-soft group-hover:text-accent transition-colors duration-200">
                    {col.title}
                  </h3>
                  <p className="text-xs text-ink-ghost uppercase tracking-wide font-medium mt-0.5">
                    {col.subtitle}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
