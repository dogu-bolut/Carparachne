import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils/index";

// ── Dynamic Server Metadata ──────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

/* ── Static data — mapped to translation keys ── */
const CATEGORY_KEYS = [
  "all",
  "craft",
  "sustainability",
  "style",
  "studioNotes",
];

// Added a translation key identifier to link mock posts to the JSON dictionary
const MOCK_POSTS: (BlogPost & { tKey: string })[] = [
  {
    id: "1",
    slug: "why-natural-fibres-age-better",
    tKey: "post1",
    category: "craft",
    title: "",
    excerpt: "",
    content: "",
    coverImage: {
      id: "i1",
      src: "/images/blog-fibres.jpg",
      altText: "Linen folded on a wooden surface",
      width: 1200,
      height: 675,
    },
    author: {
      id: "a1",
      name: "Lena Hartmann",
      bio: "",
      avatar: {
        id: "av1",
        src: "/images/team-lena.jpg",
        altText: "Lena",
        width: 80,
        height: 80,
      },
    },
    tags: ["craft", "materials"],
    publishedAt: "2026-03-10T08:00:00Z",
    readingTime: 6,
    seo: { title: "", description: "" },
  },
  {
    id: "2",
    slug: "our-visit-to-the-alentejo-mills",
    tKey: "post2",
    category: "studioNotes",
    title: "",
    excerpt: "",
    content: "",
    coverImage: {
      id: "i2",
      src: "/images/blog-portugal.jpg",
      altText: "Rows of linen drying in Portuguese sun",
      width: 1200,
      height: 675,
    },
    author: {
      id: "a2",
      name: "Marcus Veil",
      bio: "",
      avatar: {
        id: "av2",
        src: "/images/team-marcus.jpg",
        altText: "Marcus",
        width: 80,
        height: 80,
      },
    },
    tags: ["sourcing", "travel"],
    publishedAt: "2026-02-14T09:00:00Z",
    readingTime: 8,
    seo: { title: "", description: "" },
  },
  {
    id: "3",
    slug: "the-case-for-buying-less",
    tKey: "post3",
    category: "sustainability",
    title: "",
    excerpt: "",
    content: "",
    coverImage: {
      id: "i3",
      src: "/images/blog-less.jpg",
      altText: "Minimal wardrobe on an open rail",
      width: 1200,
      height: 675,
    },
    author: {
      id: "a3",
      name: "Priya Nair",
      bio: "",
      avatar: {
        id: "av3",
        src: "/images/team-priya.jpg",
        altText: "Priya",
        width: 80,
        height: 80,
      },
    },
    tags: ["sustainability", "style"],
    publishedAt: "2026-01-28T10:00:00Z",
    readingTime: 5,
    seo: { title: "", description: "" },
  },
  {
    id: "4",
    slug: "spring-palette-2026",
    tKey: "post4",
    category: "style",
    title: "",
    excerpt: "",
    content: "",
    coverImage: {
      id: "i4",
      src: "/images/blog-palette.jpg",
      altText: "Neutral garments in earthy tones",
      width: 1200,
      height: 675,
    },
    author: {
      id: "a1",
      name: "Lena Hartmann",
      bio: "",
      avatar: {
        id: "av1",
        src: "/images/team-lena.jpg",
        altText: "Lena",
        width: 80,
        height: 80,
      },
    },
    tags: ["style", "colour"],
    publishedAt: "2026-01-10T08:00:00Z",
    readingTime: 4,
    seo: { title: "", description: "" },
  },
];

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; tag?: string }>; // Add 'tag' here
};

export default async function BlogIndexPage({ searchParams }: Props) {
  // 1. Await params and translations
  const resolvedParams = await searchParams;
  const category = resolvedParams.category ?? "all";
  const tag = resolvedParams.tag; // Extract the tag parameter
  const t = await getTranslations("Blog");

  // 2. Filter posts based on BOTH category and tag
  const filteredRaw = MOCK_POSTS.filter((p) => {
    // If category is "all", it matches. Otherwise, it must match the specific category.
    const matchesCategory = category === "all" || p.category === category;

    // If there is no tag in the URL, it matches. Otherwise, the post's tags array must include the tag.
    const matchesTag = !tag || p.tags.includes(tag.toLowerCase());

    return matchesCategory && matchesTag;
  });

  // 3. Map translations onto the raw posts
  const filtered = filteredRaw.map((post) => ({
    ...post,
    title: t(`mockPosts.${post.tKey}.title`),
    excerpt: t(`mockPosts.${post.tKey}.excerpt`),
  }));

  const [featured, ...rest] = filtered;

  return (
    <div>
      {/* ── Page header ── */}
      <div className="container-site py-12 lg:py-16 border-b border-ink-line">
        <p className="label-caps text-ink-muted mb-3">{t("header.eyebrow")}</p>
        <h1>{t("header.title")}</h1>
      </div>

      <div className="container-site py-10 lg:py-14">
        {/* ── Category pills ── */}
        <nav
          className="flex flex-wrap items-center gap-2 mb-10"
          aria-label="Blog categories"
        >
          {CATEGORY_KEYS.map((catKey) => (
            <Link
              key={catKey}
              href={catKey === "all" ? "/blog" : `/blog?category=${catKey}`}
              className={`
                px-4 py-2 rounded-full text-sm border transition-all duration-150
                ${
                  category === catKey && !tag
                    ? "bg-ink text-white border-ink"
                    : "bg-transparent text-ink-muted border-ink-line hover:border-ink hover:text-ink"
                }
              `}
              aria-current={category === catKey && !tag ? "page" : undefined}
            >
              {t(`categories.${catKey}`)}
            </Link>
          ))}

          {/* Optional: Show active tag filter pill so users know why results are limited */}
          {tag && (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-ink-muted">Filtered by tag:</span>
              <span className="px-4 py-2 rounded-full text-sm border bg-ink text-white border-ink">
                {t(`tags.${tag}`)}
              </span>
              <Link
                href="/blog"
                className="text-sm text-ink-muted hover:text-ink underline underline-offset-4 ml-2"
              >
                Clear
              </Link>
            </div>
          )}
        </nav>

        {/* ── Featured post ── */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group block mb-12 lg:mb-16"
            aria-label={`Read: ${featured.title}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-surface-raised rounded-xl overflow-hidden border border-ink-line shadow-card-rest hover:shadow-card-hover transition-shadow duration-400">
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
              <div className="p-8 lg:p-10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="badge badge-accent">
                    {t(`categories.${featured.category}`)}
                  </span>
                  <span className="text-xs text-ink-ghost">
                    {featured.readingTime} {t("ui.minRead")}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl group-hover:text-accent transition-colors duration-200 text-balance">
                  {featured.title}
                </h2>
                <p className="text-base leading-relaxed text-ink-muted line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-surface-sunken flex-shrink-0">
                    <Image
                      src={featured.author.avatar.src}
                      alt={featured.author.avatar.altText}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ink-soft">
                      {featured.author.name}
                    </p>
                    <p className="text-xs text-ink-ghost">
                      {formatDate(featured.publishedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* ── Article grid ── */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} t={t} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-muted">{t("ui.noPosts")}</p>
            <Link href="/blog" className="btn-secondary mt-6 inline-flex">
              {t("ui.viewAll")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Blog card ── */
// Passed the translation function as a prop to keep the component lightweight
function BlogCard({ post, index, t }: { post: any; index: number; t: any }) {
  return (
    <article
      className="group animate-fade-up"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-blog-thumb rounded-lg overflow-hidden bg-surface-sunken mb-4">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.altText}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={75}
            className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out-expo"
          />
        </div>
        <div className="flex items-center gap-2 mb-2.5">
          <span className="badge badge-neutral">
            {t(`categories.${post.category}`)}
          </span>
          <span className="text-xs text-ink-ghost">
            {post.readingTime} {t("ui.min")}
          </span>
        </div>
        <h3 className="font-display text-xl font-normal text-ink-soft leading-snug mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-surface-sunken flex-shrink-0">
            <Image
              src={post.author.avatar.src}
              alt={post.author.avatar.altText}
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          <span className="text-xs text-ink-ghost">
            {post.author.name} · {formatDate(post.publishedAt)}
          </span>
        </div>
      </Link>
    </article>
  );
}
