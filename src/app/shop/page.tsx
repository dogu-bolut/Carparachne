import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { FilterSidebar }    from "@/components/shop/filterSidebar";
import { MobileFilterSheet } from "@/components/shop/mobileFilterSheet";
import { ActiveFilterBar }  from "@/components/shop/activeFilterBar";
import { SortDropdown }     from "@/components/shop/sortDropdown";
import { ProductCard }      from "@/components/shared/productCard";
import { Pagination }       from "@/components/shared/pagination";

import {
  filterAndSortProducts,
  getFilterOptions,
  MOCK_PRODUCTS,
} from "@/lib/mock/mockProducts";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the full Carparachne collection — natural fibres, considered objects, and slow-made accessories.",
};

const PAGE_SIZE = 8; // bump to 20 for production

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const sort   = params.sort ?? "featured";
  const page   = Number(params.page ?? 1);

  /* ── Filter + sort mock products ── */
  const { products, total } = filterAndSortProducts(
    { ...params, page: String(page), pageSize: String(PAGE_SIZE) },
    MOCK_PRODUCTS,
  );

  const { categories, tags } = getFilterOptions(MOCK_PRODUCTS);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const hasFilters = !!(
    params.categories || params.minPrice ||
    params.maxPrice   || params.inStock  || params.tags
  );

  return (
    <div>
      {/* ── Page header ── */}
      <div className="container-site py-12 lg:py-16 border-b border-ink-line">
        <h1 className="relative inline-block px-2">
          <span 
            className="absolute inset-0 z-0" 
            style={{ 
              backgroundColor: '#fef3c7',
              transform: 'rotate(-0.3deg)',  
              boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.05)'
            }}
          />
          <span className="relative z-10">Shop</span>
        </h1>
      </div>

      {/* ── Main content: sidebar + product grid ── */}
      <div className="container-site py-10 lg:py-14">
        <div className="flex gap-10 lg:gap-14 items-start">

          {/* ── Sidebar (desktop) ── */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 sticky top-24">
            <FilterSidebar
              searchParams={params}
              categories={categories}
              tags={tags}
            />
          </aside>

          {/* ── Right column ── */}
          <div className="flex-1 min-w-0">

            {/* Toolbar row */}
            <div className="flex items-start sm:items-center justify-between gap-3 mb-6 flex-wrap">
              <div className="flex items-center gap-3 flex-wrap flex-1 min-w-0">

                {/* Mobile filter trigger */}
                <MobileFilterSheet
                  searchParams={params}
                  categories={categories}
                  tags={tags}
                />

                {/* Active filter chips */}
                <ActiveFilterBar searchParams={params} />
              </div>

              {/* Sort */}
              <Suspense>
                <SortDropdown current={sort} />
              </Suspense>
            </div>

            {/* Result count */}
            {total > 0 ? (
              <p className="text-sm text-ink-ghost mb-5">
                Showing{" "}
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of{" "}
                <strong className="text-ink-soft">{total}</strong>{" "}
                {total === 1 ? "product" : "products"}
              </p>
            ) : null}

            {/* Product grid */}
            {products.length > 0 ? (
              <div
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
                role="list"
                aria-label="Product results"
              >
                {products.map((product, i) => (
                  <div key={product.id} role="listitem">
                    <ProductCard product={product} index={i} />
                  </div>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <div className="w-14 h-14 bg-surface-sunken rounded-full flex items-center justify-center text-2xl">
                  🔍
                </div>
                <h3 className="font-sans text-base font-semibold text-ink-soft">
                  No products found
                </h3>
                <p className="text-sm text-ink-muted max-w-xs">
                  Try adjusting your filters or browse our full collection.
                </p>
                <Link href="/shop" className="btn-secondary text-sm mt-2">
                  Clear all filters
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  searchParams={params}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
