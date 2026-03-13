// src/components/shop/SortDropdown.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { SortOption } from "@/lib/types";

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "featured",     label: "Featured" },
  { value: "newest",       label: "Newest" },
  { value: "price-asc",    label: "Price: Low to High" },
  { value: "price-desc",   label: "Price: High to Low" },
  { value: "best-rating",  label: "Highest Rated" },
  { value: "most-reviewed",label: "Most Reviewed" },
];

export function SortDropdown({ current }: { current: string }) {
  const router      = useRouter();
  const pathname    = usePathname();
  const searchParams= useSearchParams();
  const [, start]   = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.delete("page");
    start(() => router.push(`${pathname}?${params}`));
  }

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <label htmlFor="sort" className="label-caps text-ink-ghost hidden sm:block">
        Sort
      </label>
      <select
        id="sort"
        value={current}
        onChange={onChange}
        className="text-sm py-2 pl-3 pr-8 bg-surface-raised border border-ink-line rounded w-auto min-w-[180px] cursor-pointer"
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}


// ─── src/components/shared/Pagination.tsx ─────────────────────────────────
// (inlined here to reduce file count)
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages:  number;
  searchParams: Record<string, string | undefined>;
}) {
  function pageHref(page: number) {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("page", String(page));
    return `?${params.toString()}`;
  }

  const pages = buildPageRange(currentPage, totalPages);

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label="Pagination"
    >
      {/* Prev */}
      <PaginationLink
        href={pageHref(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={14} />
      </PaginationLink>

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === "…" ? (
          <span key={`ellipsis-${i}`} className="px-2 text-ink-ghost text-sm select-none">
            …
          </span>
        ) : (
          <PaginationLink
            key={page}
            href={pageHref(page as number)}
            active={(page as number) === currentPage}
            aria-label={`Page ${page}`}
            aria-current={(page as number) === currentPage ? "page" : undefined}
          >
            {page}
          </PaginationLink>
        )
      )}

      {/* Next */}
      <PaginationLink
        href={pageHref(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={14} />
      </PaginationLink>
    </nav>
  );
}

function PaginationLink({
  href, disabled, active, children, ...rest
}: {
  href:     string;
  disabled?: boolean;
  active?:   boolean;
  children:  React.ReactNode;
  [k: string]: any;
}) {
  if (disabled) {
    return (
      <span
        className="w-9 h-9 flex items-center justify-center rounded text-ink-ghost opacity-40 cursor-not-allowed"
        aria-disabled
        {...rest}
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className={`
        w-9 h-9 flex items-center justify-center rounded text-sm font-medium
        transition-colors duration-150
        ${active
          ? "bg-ink text-white"
          : "text-ink-muted hover:bg-surface-sunken hover:text-ink"}
      `}
      {...rest}
    >
      {children}
    </Link>
  );
}

function buildPageRange(current: number, total: number): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const range: Array<number | "…"> = [1];
  if (current > 3)       range.push("…");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) range.push(p);
  if (current < total - 2) range.push("…");
  range.push(total);
  return range;
}


// ─── src/components/shared/Breadcrumbs.tsx ───────────────────────────────
export function Breadcrumbs({ items }: { items: Array<{ label: string; href: string }> }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className="flex items-center flex-wrap gap-1.5 text-xs text-ink-ghost"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map(({ label, href }, i) => (
          <li
            key={href}
            className="flex items-center gap-1.5"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {i < items.length - 1 ? (
              <>
                <Link
                  href={href}
                  className="hover:text-ink transition-colors capitalize"
                  itemProp="item"
                >
                  <span itemProp="name">{label}</span>
                </Link>
                <span aria-hidden className="text-ink-line">/</span>
              </>
            ) : (
              <span
                className="text-ink-muted capitalize"
                aria-current="page"
                itemProp="name"
              >
                {label}
              </span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
