// src/app/blog/[slug]/page.tsx  (Blog Post)
// ─── Single post: hero, rich editorial prose, author card, related ───────────

import type { Metadata } from "next";
import Image from "next/image";
import Link  from "next/link";
import { notFound }   from "next/navigation";
import { ArrowLeft }  from "lucide-react";
import { formatDate } from "@/lib/utils/index";

/* In production: replace with CMS/DB fetch */
async function getPost(slug: string) {
  const posts = await import("@/lib/data/blogPosts").then((m) => m.POSTS).catch(() => []);
  return posts.find((p: any) => p.slug === slug) ?? null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title:       post.seo.title,
    description: post.seo.description,
    openGraph: {
      type:   "article",
      images: [{ url: post.seo.ogImage ?? post.coverImage.src }],
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article>
      {/* ── Hero ── */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <Image
          src={post.coverImage.src}
          alt={post.coverImage.altText}
          fill priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/40 to-ink/75" aria-hidden />

        <div className="relative z-raised h-full flex flex-col justify-end">
          <div className="container-site pb-12 max-w-[860px]">
            <div className="flex items-center gap-3 mb-5">
              <span className="badge bg-white/15 text-white/90 backdrop-blur-sm border border-white/20">
                {post.category}
              </span>
              <span className="label-caps text-white/60">{post.readingTime} min read</span>
            </div>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl text-balance leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ── Author bar ── */}
      <div className="border-b border-ink-line bg-surface-raised">
        <div className="container-site py-5 max-w-[860px] flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-surface-sunken flex-shrink-0">
              <Image
                src={post.author.avatar.src}
                alt={post.author.avatar.altText}
                fill sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-ink-soft">{post.author.name}</p>
              <p className="text-xs text-ink-ghost">
                {post.author.role ?? ""} · {formatDate(post.publishedAt)}
              </p>
            </div>
          </div>

          {/* Back link */}
          <Link
            href="/blog"
            className="flex items-center gap-1.5 label-caps text-ink-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={12} />
            All Articles
          </Link>
        </div>
      </div>

      {/* ── Prose content ── */}
      <div className="container-site py-12 lg:py-16">
        {/*
          Editorial grid: prose column (left) + sticky sidebar (right).
          On mobile, sidebar drops below.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12 xl:gap-16 items-start max-w-[1060px]">

          {/* Main prose */}
          <div
            className="prose prose-editorial prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Sidebar: table of contents + share */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-8">
            <div className="bg-surface-raised rounded-lg border border-ink-line p-5">
              <h2 className="label-caps text-ink-muted mb-4">In this article</h2>
              {/* TOC items would be auto-generated from headings via rehype-toc */}
              <nav aria-label="Table of contents">
                <ul className="flex flex-col gap-2.5">
                  {post.toc?.map((item: { id: string; text: string; level: number }) => (
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
                  ))}
                </ul>
              </nav>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div>
                <h2 className="label-caps text-ink-muted mb-3">Tags</h2>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="badge badge-neutral hover:border-ink-ghost transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* ── Author bio card ── */}
      <div className="border-t border-ink-line bg-surface-sunken">
        <div className="container-site py-10 max-w-[860px]">
          <div className="flex gap-5 items-start">
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-surface-raised flex-shrink-0">
              <Image
                src={post.author.avatar.src}
                alt={post.author.avatar.altText}
                fill sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="label-caps text-ink-ghost mb-1">Written by</p>
              <h3 className="font-sans font-semibold text-ink-soft mb-1">{post.author.name}</h3>
              {post.author.bio && (
                <p className="text-sm text-ink-muted leading-relaxed max-w-prose">
                  {post.author.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
