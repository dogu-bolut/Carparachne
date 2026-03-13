import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage:  number;
  totalPages:   number;
  /** Pass the current search/filter params so they're preserved in page links */
  searchParams: Record<string, string | undefined>;
}

export function Pagination({ currentPage, totalPages, searchParams }: Props) {
  function pageHref(page: number): string {
    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries(searchParams).filter(([ , v]) => v !== undefined)
      ) as Record<string, string>
    );
    params.set("page", String(page));
    return `?${params.toString()}`;
  }

  const pages = buildPageRange(currentPage, totalPages);

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label="Pagination navigation"
    >
      {/* Previous */}
      <PaginationLink
        href={pageHref(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft size={14} />
      </PaginationLink>

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-ink-ghost text-sm select-none"
            aria-hidden
          >
            …
          </span>
        ) : (
          <PaginationLink
            key={page as number}
            href={pageHref(page as number)}
            active={(page as number) === currentPage}
            aria-label={`Go to page ${page}`}
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
        aria-label="Go to next page"
      >
        <ChevronRight size={14} />
      </PaginationLink>
    </nav>
  );
}

/* ── Sub-component ────────────────────────────────────────────────────────── */

interface LinkProps {
  href: string;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
  "aria-current"?: "page" | undefined;
}

function PaginationLink({ href, disabled, active, children, ...rest }: LinkProps) {
  const base =
    "w-9 h-9 flex items-center justify-center rounded text-sm font-medium transition-colors duration-150";

  if (disabled) {
    return (
      <span
        className={`${base} text-ink-ghost opacity-40 cursor-not-allowed`}
        aria-disabled="true"
        role="link"
        {...rest}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={`${base} ${
        active
          ? "bg-ink text-white"
          : "text-ink-muted hover:bg-surface-sunken hover:text-ink"
      }`}
      {...rest}
    >
      {children}
    </a>
  );
}

/* ── Utility: build a page range with ellipsis ───────────────────────────── */

function buildPageRange(current: number, total: number): Array<number | "…"> {
  // Show all pages if total is small enough
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const range: Array<number | "…"> = [1];

  if (current > 3) range.push("…");

  const start = Math.max(2, current - 1);
  const end   = Math.min(total - 1, current + 1);
  for (let p = start; p <= end; p++) range.push(p);

  if (current < total - 2) range.push("…");

  range.push(total);
  return range;
}
