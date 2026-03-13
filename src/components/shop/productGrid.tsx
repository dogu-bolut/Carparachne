// src/components/shop/ProductGrid.tsx
// ─── Async server component — fetches + renders paginated product grid ───────

import { ProductCard }   from "@/components/shared/productCard";
import { Pagination }    from "@/components/shared/pagination";
import { getProducts }   from "@/lib/utils/index";
import type { ActiveFilters } from "@/lib/types";

const PAGE_SIZE = 20;

interface Props {
  searchParams: Record<string, string | undefined>;
}

export async function ProductGrid({ searchParams }: Props) {
  const page    = Number(searchParams.page   ?? 1);
  const minP    = Number(searchParams.minPrice ?? 0);
  const maxP    = Number(searchParams.maxPrice ?? 99999);
  const inStock = searchParams.inStock === "true";

  const { products, total } = await getProducts({
    ...searchParams,
    page:     String(page),
    pageSize: String(PAGE_SIZE),
  });

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (products.length === 0) {
    return (
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
        <a href="/shop" className="btn-secondary text-sm mt-2">
          Clear all filters
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Result count */}
      <p className="text-sm text-ink-ghost mb-5">
        Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of{" "}
        <strong className="text-ink-soft">{total}</strong> products
      </p>

      {/* Grid */}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            searchParams={searchParams}
          />
        </div>
      )}
    </div>
  );
}
