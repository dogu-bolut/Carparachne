import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils/index";
import { getTranslations } from "next-intl/server";

// 1. Import your localized fetching function
import { getLocalizedPosts } from "@/lib/data/blogPosts";

// 2. Pass the locale to the fetcher
async function getPost(slug: string, locale: string) {
  const posts = await getLocalizedPosts(locale).catch(() => []);
  return posts.find((p: any) => p.slug === slug) ?? null;
}

// 3. Add locale to the Props promise
type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPost(slug, locale);

  if (!post) return {};

  return {
    title: post.seo.title,
    description: post.seo.description,
    openGraph: {
      type: "article",
      images: [{ url: post.seo.ogImage ?? post.coverImage.src }],
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;

  // 4. Fetch the translated post and initialize translations
  const post = await getPost(slug, locale);
  const t = await getTranslations("Blog");

  if (!post) notFound();

  return (
    <article>
      {/* ── Hero ── */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <Image
          src={post.coverImage.src}
          alt={post.coverImage.altText}
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/40 to-ink/75"
          aria-hidden
        />

        <div className="relative z-raised h-full flex flex-col justify-end">
          <div className="container-site pb-12">
            <div className="max-w-[860px]">
              <div className="flex items-center gap-3 mb-5">
                <span className="badge bg-white/15 text-white/90 backdrop-blur-sm border border-white/20">
                  {/* Category is already translated by getLocalizedPosts */}
                  {post.category}
                </span>
                <span className="label-caps text-white/60">
                  {post.readingTime} {t("slugPage.minRead")}
                </span>
              </div>
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl text-balance leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ── Author bar ── */}
      <div className="border-b border-ink-line bg-surface-raised">
        <div className="container-site py-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4 xl:gap-16 items-center max-w-[1060px]">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-surface-sunken flex-shrink-0">
                <Image
                  src={post.author.avatar.src}
                  alt={post.author.avatar.altText}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-soft">
                  {post.author.name}
                </p>
                <p className="text-xs text-ink-ghost">
                  {post.author.role ?? ""} · {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Link
                href="/blog"
                className="flex items-center gap-1.5 label-caps text-ink-muted hover:text-ink transition-colors"
              >
                <ArrowLeft size={12} />
                {t("slugPage.allArticles")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Prose content ── */}
      <div className="container-site py-6 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12 xl:gap-16 items-start max-w-[1060px]">
          <aside className="lg:sticky lg:top-24 flex flex-col gap-6 order-first lg:order-last">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div>
                <h2 className="label-caps text-ink-muted mb-3">
                  {t("slugPage.tags")}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`} // Keeps the clean URL: /blog?tag=science
                      className="badge badge-neutral hover:border-ink-ghost transition-colors"
                    >
                      {t(`tags.${tag}`)}{" "}
                      {/* Displays "Bilim" or "Science" safely */}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-surface-raised rounded-lg border border-ink-line p-5">
              <h2 className="label-caps text-ink-muted mb-4">
                {t("slugPage.inThisArticle")}
              </h2>
              <nav aria-label="Table of contents">
                <ul className="flex flex-col gap-2">
                  {post.toc?.map(
                    (item: { id: string; text: string; level: number }) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`
                          block text-sm hover:text-accent transition-colors
                          ${item.level === 2 ? "text-ink-muted" : "text-ink-ghost pl-3"}
                        `}
                        >
                          {item.text}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main prose */}
          <div
            className="prose prose-editorial prose-lg max-w-none prose-headings:scroll-mt-28"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>

      {/* ── Author bio card ── */}
      <div className="border-t border-ink-line bg-surface-sunken">
        <div className="container-site py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12 xl:gap-16 items-start max-w-[1060px]">
            <div className="flex gap-5 items-start">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-surface-raised flex-shrink-0">
                <Image
                  src={post.author.avatar.src}
                  alt={post.author.avatar.altText}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="label-caps text-ink-ghost mb-1">
                  {t("slugPage.writtenBy")}
                </p>
                <h3 className="font-sans font-semibold text-ink-soft mb-1">
                  {post.author.name}
                </h3>
                {post.author.bio && (
                  <p className="text-sm text-ink-muted leading-relaxed max-w-prose">
                    {post.author.bio}
                  </p>
                )}
              </div>
            </div>

            <div className="hidden lg:block" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </article>
  );
}
