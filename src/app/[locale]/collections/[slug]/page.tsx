import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ChevronRight, Package, Tag, ArrowLeft } from "lucide-react";

import { ProductCard } from "@/components/shared/productCard";
import { MOCK_PRODUCTS } from "@/lib/mock/mockProducts";

/* ── Types ── */
type Collection = {
  id: string;
  slug: string;
  tKey: string;
  year: number;
  category: string;
  categorySlug: string;
  itemCount: number;
  coverImage: { src: string; altText: string };
  galleryImages?: { src: string; altText: string }[];
  productSlugs: string[];
  isNew?: boolean;
};

/* ── Mock data — mirrors the index page exactly ── */
const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "1",
    slug: "spring-linen-2026",
    tKey: "collection1",
    year: 2026,
    category: "Apparel",
    categorySlug: "apparel",
    itemCount: 14,
    isNew: true,
    coverImage: {
      src: "/images/collection-spring-linen.jpg",
      altText: "Linen draped garments in ivory and sand tones",
    },
    galleryImages: [
      {
        src: "/images/collection-spring-linen-2.jpg",
        altText: "Linen shirt on wooden hanger",
      },
      {
        src: "/images/collection-spring-linen-3.jpg",
        altText: "Detail of stonewashed linen texture",
      },
    ],
    productSlugs: ["the-linen-overshirt", "merino-crewneck"],
  },
  {
    id: "2",
    slug: "workshop-ceramics-2026",
    tKey: "collection2",
    year: 2026,
    category: "Home & Living",
    categorySlug: "home-and-living",
    itemCount: 9,
    isNew: true,
    coverImage: {
      src: "/images/collection-ceramics.jpg",
      altText: "Stoneware bowls and cups on a stone surface",
    },
    galleryImages: [
      {
        src: "/images/collection-ceramics-2.jpg",
        altText: "Close-up of ash glaze on stoneware",
      },
    ],
    productSlugs: ["ceramic-mug-set"],
  },
  {
    id: "3",
    slug: "autumn-wool-2025",
    tKey: "collection3",
    year: 2025,
    category: "Apparel",
    categorySlug: "apparel",
    itemCount: 18,
    coverImage: {
      src: "/images/collection-wool.jpg",
      altText: "Wool coats hanging in a stone archway",
    },
    galleryImages: [],
    productSlugs: ["merino-crewneck", "wool-blanket"],
  },
  {
    id: "4",
    slug: "table-linen-collection",
    tKey: "collection4",
    year: 2024,
    category: "Home & Living",
    categorySlug: "home-and-living",
    itemCount: 22,
    coverImage: {
      src: "/images/collection-table-linen.jpg",
      altText: "Linen tablecloth set with simple ceramic ware",
    },
    galleryImages: [],
    productSlugs: ["bamboo-candle", "ceramic-mug-set"],
  },
  {
    id: "5",
    slug: "leather-goods-2025",
    tKey: "collection5",
    year: 2025,
    category: "Accessories",
    categorySlug: "accessories",
    itemCount: 11,
    coverImage: {
      src: "/images/collection-leather.jpg",
      altText: "Tan leather bag on a wooden workshop bench",
    },
    galleryImages: [],
    productSlugs: ["leather-card-holder", "canvas-tote"],
  },
  {
    id: "6",
    slug: "archive-summer-2023",
    tKey: "collection6",
    year: 2023,
    category: "Archive",
    categorySlug: "archive",
    itemCount: 6,
    coverImage: {
      src: "/images/collection-archive.jpg",
      altText: "Folded linen garments in warm afternoon light",
    },
    galleryImages: [],
    productSlugs: ["the-linen-overshirt", "silk-scarf"],
  },
];

/* ── Metadata ── */
type Props = { params: Promise<{ slug: string; locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Collections" });
  const collection = MOCK_COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) return { title: t("slugPage.notFound") };
  return {
    title: `${t(`mockCollections.${collection.tKey}.title`)} — ${t(`mockCollections.${collection.tKey}.subtitle`)}`,
    description: t(`mockCollections.${collection.tKey}.description`),
  };
}

export function generateStaticParams() {
  return MOCK_COLLECTIONS.map((c) => ({ slug: c.slug }));
}

/* ── Page ── */
export default async function CollectionDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Collections" });
  const collection = MOCK_COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) notFound();

  const collectionProducts = MOCK_PRODUCTS.filter((p) =>
    collection.productSlugs.includes(p.slug),
  );

  // Other collections for the "More Collections" strip
  const otherCollections = MOCK_COLLECTIONS.filter(
    (c) => c.slug !== slug,
  ).slice(0, 3);

  return (
    <div>
      {/* ── Breadcrumb ── */}
      <div className="container-site pt-6 pb-0">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-xs text-ink-ghost flex-wrap">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">
                {t("slugPage.home")}
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={12} className="text-ink-line" />
            </li>
            <li>
              <Link
                href="/collections"
                className="hover:text-ink transition-colors"
              >
                {t("header.title")}
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={12} className="text-ink-line" />
            </li>
            <li className="text-ink-muted" aria-current="page">
              {t(`mockCollections.${collection.tKey}.title`)}
            </li>
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
                  <span className="badge badge-accent">{t("ui.newBadge")}</span>
                </div>
              )}
            </div>

            {/* Gallery thumbnails */}
            {collection.galleryImages &&
              collection.galleryImages.length > 0 && (
                <div className="flex gap-3">
                  {/* Active thumb (cover) */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-ink flex-shrink-0 bg-surface-sunken">
                    <Image
                      src={collection.coverImage.src}
                      alt={collection.coverImage.altText}
                      fill
                      sizes="80px"
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
                        fill
                        sizes="80px"
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
              <span className="badge badge-neutral">{t(`categories.${collection.category}`)}</span>
              <span className="text-xs text-ink-ghost">
                {t(`mockCollections.${collection.tKey}.season`)} {collection.year}
              </span>
              <span className="text-xs text-ink-ghost">·</span>
              <span className="text-xs text-ink-ghost flex items-center gap-1">
                <Package size={11} />
                {collection.itemCount} {t("ui.pieces")}
              </span>
            </div>

            {/* Titles */}
            <div>
              <h1 className="text-3xl lg:text-4xl text-balance mb-2">
                {t(`mockCollections.${collection.tKey}.title`)}
              </h1>
              <p className="text-sm text-ink-ghost uppercase tracking-widest font-medium">
                {t(`mockCollections.${collection.tKey}.subtitle`)}
              </p>
            </div>

            {/* Description */}
            <p className="text-base text-ink-muted leading-relaxed">
              {t(`mockCollections.${collection.tKey}.description`)}
            </p>

            {/* Long description */}
            <div className="border-t border-ink-line pt-5">
              {t(`mockCollections.${collection.tKey}.longDescription`)
                .split("\n\n")
                .map((para: string, i: number) => (
                  <p
                    key={i}
                    className="text-sm text-ink-muted leading-relaxed mb-3 last:mb-0"
                  >
                    {para}
                  </p>
                ))}
            </div>

            {/* Materials */}
            <div className="border-t border-ink-line pt-5">
              <p className="label-caps text-ink-soft mb-3 flex items-center gap-2">
                <Tag size={12} />
                {t("slugPage.materialsAndProvenance")}
              </p>
              <ul className="flex flex-col gap-1.5">
                {(t.raw(`mockCollections.${collection.tKey}.materials`) as string[]).map((m: string) => (
                  <li
                    key={m}
                    className="flex items-start gap-2 text-sm text-ink-muted"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-ink-ghost flex-shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Care */}
            <div className="border-t border-ink-line pt-5">
              <p className="label-caps text-ink-soft mb-2">{t("slugPage.care")}</p>
              <p className="text-sm text-ink-muted">
                {t(`mockCollections.${collection.tKey}.careInstructions`)}
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/shop?categories=${collection.categorySlug.toLowerCase().replace(/\s/g, "-")}`}
                className="btn-primary flex-1 text-center"
              >
                {t("slugPage.shopThisCollection")}
              </Link>
              <Link
                href="/collections"
                className="btn-secondary flex items-center gap-2 justify-center"
              >
                <ArrowLeft size={14} />
                {t("slugPage.allCollections")}
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
                <p className="label-caps text-ink-muted mb-2">
                  {t("slugPage.fromThisCollection")}
                </p>
                <h2 className="text-2xl">{t("slugPage.featuredPieces")}</h2>
              </div>
              <Link
                href={`/shop?categories=${collection.categorySlug.toLowerCase().replace(/\s/g, "-")}`}
                className="text-sm text-ink-muted hover:text-accent underline underline-offset-2 transition-colors hidden sm:block"
              >
                {t("slugPage.viewAllPieces", { count: collection.itemCount })}
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
                {t("slugPage.viewAllPieces", { count: collection.itemCount })}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── More collections ── */}
      {otherCollections.length > 0 && (
        <div className="border-t border-ink-line bg-surface-raised">
          <div className="container-site py-10 lg:py-14">
            <p className="label-caps text-ink-muted mb-2">{t("slugPage.exploreFurther")}</p>
            <h2 className="text-2xl mb-8">{t("slugPage.moreCollections")}</h2>

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
                        <span className="badge badge-accent">{t("ui.newBadge")}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="badge badge-neutral">{t(`categories.${col.category}`)}</span>
                    <span className="text-xs text-ink-ghost">
                      {t(`mockCollections.${col.tKey}.season`)} {col.year}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-normal text-ink-soft group-hover:text-accent transition-colors duration-200">
                    {t(`mockCollections.${col.tKey}.title`)}
                  </h3>
                  <p className="text-xs text-ink-ghost uppercase tracking-wide font-medium mt-0.5">
                    {t(`mockCollections.${col.tKey}.subtitle`)}
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
