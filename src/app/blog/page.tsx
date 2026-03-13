// src/app/blog/page.tsx  (Blog Index)
// ─── Article grid with featured post hero + category filtering ───────────────

import type { Metadata } from "next";
import Image from "next/image";
import Link  from "next/link";
import type { BlogPost } from "@/lib/types";
import { formatDate }    from "@/lib/utils/index";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Stories on craft, sustainability, style, and the considered life. Dispatches from the Atelier studio.",
};

/* ── Static data — replace with CMS query ── */
const CATEGORIES = ["All", "Craft", "Sustainability", "Style", "Studio Notes"];

async function getPosts(): Promise<BlogPost[]> {
  // Replace with: return fetch('/api/blog').then(r => r.json())
  return MOCK_POSTS;
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const posts    = await getPosts();
  const category = searchParams.category ?? "All";

  const filtered =
    category === "All"
      ? posts
      : posts.filter((p) => p.category === category);

  const [featured, ...rest] = filtered;

  return (
    <div>
      {/* ── Page header ── */}
      <div className="container-site py-12 lg:py-16 border-b border-ink-line">
        <p className="label-caps text-ink-muted mb-3">Stories & Ideas</p>
        <h1>The Journal</h1>
      </div>

      <div className="container-site py-10 lg:py-14">

        {/* ── Category pills ── */}
        <nav
          className="flex flex-wrap gap-2 mb-10"
          aria-label="Blog categories"
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
              className={`
                px-4 py-2 rounded-full text-sm border transition-all duration-150
                ${category === cat
                  ? "bg-ink text-white border-ink"
                  : "bg-transparent text-ink-muted border-ink-line hover:border-ink hover:text-ink"}
              `}
              aria-current={category === cat ? "page" : undefined}
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* ── Featured post (large hero card) ── */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group block mb-12 lg:mb-16"
            aria-label={`Read: ${featured.title}`}
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
                <div className="flex items-center gap-3">
                  <span className="badge badge-accent">{featured.category}</span>
                  <span className="text-xs text-ink-ghost">{featured.readingTime} min read</span>
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
                      fill sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-ink-soft">{featured.author.name}</p>
                    <p className="text-xs text-ink-ghost">{formatDate(featured.publishedAt)}</p>
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
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-muted">No posts in this category yet.</p>
            <Link href="/blog" className="btn-secondary mt-6 inline-flex">
              View All Posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Blog card ── */
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <article
      className="group animate-fade-up"
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Cover */}
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

        {/* Meta */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="badge badge-neutral">{post.category}</span>
          <span className="text-xs text-ink-ghost">{post.readingTime} min</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-normal text-ink-soft leading-snug mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-ink-muted leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {/* Author + date */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-surface-sunken flex-shrink-0">
            <Image
              src={post.author.avatar.src}
              alt={post.author.avatar.altText}
              fill sizes="28px"
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

/* ── Mock data ── */
const MOCK_POSTS: BlogPost[] = [
  {
    id: "1", slug: "why-natural-fibres-age-better",
    title: "Why Natural Fibres Only Get Better With Age",
    excerpt: "There is a particular kind of beauty that synthetic materials can never replicate — the grace of a garment that has been worn, washed and lived in.",
    content: "", category: "Craft",
    coverImage: { id: "i1", src: "/images/blog-fibres.jpg", altText: "Linen folded on a wooden surface", width: 1200, height: 675 },
    author: { id: "a1", name: "Lena Hartmann", bio: "", avatar: { id: "av1", src: "/images/team-lena.jpg", altText: "Lena", width: 80, height: 80 } },
    tags: ["craft", "materials"], publishedAt: "2025-03-10T08:00:00Z", readingTime: 6,
    seo: { title: "Why Natural Fibres Age Better", description: "" },
  },
  {
    id: "2", slug: "our-visit-to-the-alentejo-mills",
    title: "Our Visit to the Alentejo Linen Mills",
    excerpt: "Every year we travel to southern Portugal to meet the families who have been weaving linen for three generations. This year's trip reminded us why craft matters.",
    content: "", category: "Studio Notes",
    coverImage: { id: "i2", src: "/images/blog-portugal.jpg", altText: "Rows of linen drying in Portuguese sun", width: 1200, height: 675 },
    author: { id: "a2", name: "Marcus Veil", bio: "", avatar: { id: "av2", src: "/images/team-marcus.jpg", altText: "Marcus", width: 80, height: 80 } },
    tags: ["sourcing", "travel"], publishedAt: "2025-02-14T09:00:00Z", readingTime: 8,
    seo: { title: "Visit to Alentejo Linen Mills", description: "" },
  },
  {
    id: "3", slug: "the-case-for-buying-less",
    title: "The Case for Buying Less — and Better",
    excerpt: "Counter-intuitive as it sounds for a shop to say this: the best thing you can do for your wardrobe is stop buying so much of it.",
    content: "", category: "Sustainability",
    coverImage: { id: "i3", src: "/images/blog-less.jpg", altText: "Minimal wardrobe on an open rail", width: 1200, height: 675 },
    author: { id: "a3", name: "Priya Nair", bio: "", avatar: { id: "av3", src: "/images/team-priya.jpg", altText: "Priya", width: 80, height: 80 } },
    tags: ["sustainability", "style"], publishedAt: "2025-01-28T10:00:00Z", readingTime: 5,
    seo: { title: "The Case for Buying Less", description: "" },
  },
  {
    id: "4", slug: "spring-palette-2025",
    title: "Building a Spring Palette Around One Neutral",
    excerpt: "How a single warm stone colour can anchor an entire season's wardrobe and make getting dressed feel effortless.",
    content: "", category: "Style",
    coverImage: { id: "i4", src: "/images/blog-palette.jpg", altText: "Neutral garments in earthy tones", width: 1200, height: 675 },
    author: { id: "a1", name: "Lena Hartmann", bio: "", avatar: { id: "av1", src: "/images/team-lena.jpg", altText: "Lena", width: 80, height: 80 } },
    tags: ["style", "colour"], publishedAt: "2025-01-10T08:00:00Z", readingTime: 4,
    seo: { title: "Spring Palette 2025", description: "" },
  },
];
