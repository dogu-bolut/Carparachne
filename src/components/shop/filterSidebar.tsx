"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname }  from "next/navigation";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type { CategoryOption } from "@/lib/mock/mockProducts";

const PRICE_PRESETS = [
  { label: "Under $50",     min: 0,   max: 50  },
  { label: "$50 – $100",    min: 50,  max: 100 },
  { label: "$100 – $200",   min: 100, max: 200 },
  { label: "$200+",         min: 200, max: 9999 },
];

interface Props {
  searchParams: Record<string, string | undefined>;
  /** Category list derived from live product data (slug, label, count). */
  categories:   CategoryOption[];
  /** Tag list derived from live product data, alphabetically sorted. */
  tags:         string[];
}

type Section = "categories" | "price" | "tags" | "availability";

export function FilterSidebar({ searchParams, categories, tags }: Props) {
  const router   = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<Set<Section>>(
    new Set(["categories", "price"])
  );

  const activeCategories = (searchParams.categories ?? "").split(",").filter(Boolean);
  const activeTags       = (searchParams.tags       ?? "").split(",").filter(Boolean);
  const inStockOnly      = searchParams.inStock === "true";

  function toggle(section: Section) {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(section) ? next.delete(section) : next.add(section);
      return next;
    });
  }

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    if (value === null || value === "") params.delete(key);
    else params.set(key, value);
    params.delete("page"); // reset pagination
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  function toggleCategory(slug: string) {
    const set = new Set(activeCategories);
    set.has(slug) ? set.delete(slug) : set.add(slug);
    updateParam("categories", [...set].join(",") || null);
  }

  function toggleTag(tag: string) {
    const set = new Set(activeTags);
    set.has(tag) ? set.delete(tag) : set.add(tag);
    updateParam("tags", [...set].join(",") || null);
  }

  function clearAll() {
    startTransition(() => router.push(pathname));
  }

  const hasFilters =
    activeCategories.length > 0 ||
    activeTags.length > 0 ||
    inStockOnly ||
    searchParams.minPrice ||
    searchParams.maxPrice;

  return (
    <div className={`transition-opacity duration-200 ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 font-sans text-base font-semibold text-ink-soft">
          <SlidersHorizontal size={16} />
          Filters
        </h2>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-ink-muted hover:text-accent underline underline-offset-2 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* ── Categories ── */}
      <FilterGroup
        title="Category"
        isOpen={open.has("categories")}
        onToggle={() => toggle("categories")}
      >
        <ul className="flex flex-col gap-2.5">
          {categories.map(({ slug, label, count }) => (
            <li key={slug}>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="flex items-center gap-2.5">
                  <CheckBox
                    checked={activeCategories.includes(slug)}
                    onChange={() => toggleCategory(slug)}
                    id={`cat-${slug}`}
                  />
                  <span className="text-sm text-ink-muted group-hover:text-ink transition-colors">
                    {label}
                  </span>
                </span>
                <span className="text-xs text-ink-ghost">{count}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterGroup>

      <hr className="my-5" />

      {/* ── Price ── */}
      <FilterGroup
        title="Price"
        isOpen={open.has("price")}
        onToggle={() => toggle("price")}
      >
        <ul className="flex flex-col gap-2.5 mb-4">
          {PRICE_PRESETS.map(({ label, min, max }) => {
            const active =
              Number(searchParams.minPrice) === min &&
              Number(searchParams.maxPrice) === max;
            return (
              <li key={label}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <CheckBox
                    checked={active}
                    onChange={() =>
                      active
                        ? (updateParam("minPrice", null), updateParam("maxPrice", null))
                        : (updateParam("minPrice", String(min)), updateParam("maxPrice", String(max)))
                    }
                    id={`price-${min}-${max}`}
                  />
                  <span className="text-sm text-ink-muted group-hover:text-ink transition-colors">
                    {label}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        {/* Custom range inputs */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={searchParams.minPrice ?? ""}
            onChange={(e) => updateParam("minPrice", e.target.value || null)}
            className="w-full text-sm py-2 px-3"
            aria-label="Minimum price"
          />
          <span className="text-ink-ghost text-sm">–</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={searchParams.maxPrice ?? ""}
            onChange={(e) => updateParam("maxPrice", e.target.value || null)}
            className="w-full text-sm py-2 px-3"
            aria-label="Maximum price"
          />
        </div>
      </FilterGroup>

      <hr className="my-5" />

      {/* ── Tags ── */}
      <FilterGroup
        title="Tags"
        isOpen={open.has("tags")}
        onToggle={() => toggle("tags")}
      >
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const active = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`
                  px-3 py-1.5 rounded text-xs font-medium border transition-all duration-150
                  ${active
                    ? "bg-ink text-white border-ink"
                    : "bg-transparent text-ink-muted border-ink-line hover:border-ink hover:text-ink"}
                `}
                aria-pressed={active}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <hr className="my-5" />

      {/* ── Availability ── */}
      <FilterGroup
        title="Availability"
        isOpen={open.has("availability")}
        onToggle={() => toggle("availability")}
      >
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <CheckBox
            checked={inStockOnly}
            onChange={() => updateParam("inStock", inStockOnly ? null : "true")}
            id="in-stock"
          />
          <span className="text-sm text-ink-muted group-hover:text-ink transition-colors">
            In stock only
          </span>
        </label>
      </FilterGroup>
    </div>
  );
}

/* ── Sub-components ── */

function FilterGroup({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between mb-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="label-caps text-ink-soft">{title}</span>
        <ChevronDown
          size={14}
          className={`text-ink-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && <div className="animate-fade-in">{children}</div>}
    </div>
  );
}

function CheckBox({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: () => void;
  id: string;
}) {
  return (
    <div
      className={`
        w-4 h-4 rounded-sm flex-shrink-0 border transition-all duration-150
        flex items-center justify-center
        ${checked
          ? "bg-ink border-ink"
          : "bg-surface-raised border-ink-line"}
      `}
      role="checkbox"
      aria-checked={checked}
      id={id}
      tabIndex={0}
      onClick={onChange}
      onKeyDown={(e) => e.key === " " && onChange()}
    >
      {checked && (
        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 12 12">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
        </svg>
      )}
    </div>
  );
}