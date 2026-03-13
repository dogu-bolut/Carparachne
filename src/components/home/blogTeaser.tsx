import Image from "next/image";
import Link  from "next/link";
import { formatDate } from "@/lib/utils/index";
import type { BlogPost } from "@/lib/types";

/* In production replace with: import { getRecentPosts } from "@/lib/utils/blogFetchers" */
const TEASER_POSTS: Pick<
  BlogPost,
  "id" | "slug" | "title" | "excerpt" | "coverImage" | "author" | "category" | "publishedAt" | "readingTime"
>[] = [
  {
    id:       "1",
    slug:     "why-natural-fibres-age-better",
    title:    "Why Natural Fibres Only Get Better With Age",
    excerpt:  "There is a particular kind of beauty that synthetic materials can never replicate — the grace of a garment that has been worn, washed, and lived in.",
    category: "Craft",
    coverImage: {
      id: "ci1", src: "/images/blog-fibres.jpg",
      altText: "Linen folded on a warm wooden surface",
      width: 1200, height: 675,
    },
    author: {
      id: "a1", name: "Lena Hartmann", bio: "",
      avatar: { id: "av1", src: "/images/team-lena.jpg", altText: "Lena", width: 80, height: 80 },
    },
    publishedAt: "2025-03-10T08:00:00Z",
    readingTime: 6,
  },
  {
    id:       "2",
    slug:     "our-visit-to-the-alentejo-mills",
    title:    "Our Visit to the Alentejo Linen Mills",
    excerpt:  "Every year we travel to southern Portugal to meet the families who have been weaving linen for three generations. This year reminded us why craft matters.",
    category: "Studio Notes",
    coverImage: {
      id: "ci2", src: "/images/blog-portugal.jpg",
      altText: "Rows of linen drying in the Portuguese sun",
      width: 1200, height: 675,
    },
    author: {
      id: "a2", name: "Marcus Veil", bio: "",
      avatar: { id: "av2", src: "/images/team-marcus.jpg", altText: "Marcus", width: 80, height: 80 },
    },
    publishedAt: "2025-02-14T09:00:00Z",
    readingTime: 8,
  },
  {
    id:       "3",
    slug:     "the-case-for-buying-less",
    title:    "The Case for Buying Less — and Better",
    excerpt:  "Counter-intuitive as it sounds for a shop to say this: the best thing you can do for your wardrobe is stop buying so much of it.",
    category: "Sustainability",
    coverImage: {
      id: "ci3", src: "/images/blog-less.jpg",
      altText: "A minimal wardrobe on an open clothing rail",
      width: 1200, height: 675,
    },
    author: {
      id: "a3", name: "Priya Nair", bio: "",
      avatar: { id: "av3", src: "/images/team-priya.jpg", altText: "Priya", width: 80, height: 80 },
    },
    publishedAt: "2025-01-28T10:00:00Z",
    readingTime: 5,
  },
];

export function BlogTeaser() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {TEASER_POSTS.map((post, i) => (
          <article
            key={post.id}
            className="group animate-fade-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <Link href={`/blog/${post.slug}`} className="block">
              {/* Cover image */}
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-surface-sunken mb-4">
                <Image
                  src={post.coverImage.src}
                  alt={post.coverImage.altText}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out-expo"
                />
              </div>

              {/* Meta row */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="badge badge-neutral">{post.category}</span>
                <span className="text-xs text-ink-ghost">{post.readingTime} min read</span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-normal text-ink-soft leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-ink-muted leading-relaxed line-clamp-2 mb-4">
                {post.excerpt}
              </p>

              {/* Author */}
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
        ))}
      </div>

      {/* View all link */}
      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="btn-secondary inline-flex"
        >
          View all articles
        </Link>
      </div>
    </>
  );
}
