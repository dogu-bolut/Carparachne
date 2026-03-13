import type { Metadata } from "next";
import { Suspense } from "react";
import { FilterSidebar }   from "@/components/shop/filterSidebar";
import { SortDropdown }    from "@/components/shop/sortDropdown";
import { ProductGrid }     from "@/components/shop/productGrid";
import { ActiveFilterBar } from "@/components/shop/activeFilterBar";
import { MobileFilterSheet } from "@/components/shop/mobileFilterSheet";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse our full collection of thoughtfully made products.",
};

interface ShopPageProps {
  searchParams: {
    sort?:        string;
    categories?:  string;   // comma-separated slugs
    minPrice?:    string;
    maxPrice?:    string;
    tags?:        string;
    inStock?:     string;
    page?:        string;
    badge?:       string;
  };
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <div className="min-h-screen">
      {/* ── Page header ── */}
      <div className="border-b border-ink-line bg-surface-raised">
        <div className="container-site py-8 lg:py-10">
          <p className="label-caps text-ink-muted mb-2">Browse</p>
          <h1 className="text-3xl lg:text-4xl">All Products</h1>
        </div>
      </div>

      {/* ── Layout: sidebar + main ── */}
      <div className="container-site py-8 lg:py-12">
        <div className="flex gap-8 lg:gap-12 items-start">

          {/* ── Left: filter sidebar (hidden mobile) ── */}
          <aside
            className="hidden lg:block w-64 flex-shrink-0 sticky top-24"
            aria-label="Product filters"
          >
            <FilterSidebar searchParams={searchParams} />
          </aside>

          {/* ── Right: controls + grid ── */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 gap-4">
              {/* Mobile filter trigger */}
              <MobileFilterSheet searchParams={searchParams} />

              {/* Active filter chips */}
              <div className="flex-1 min-w-0">
                <ActiveFilterBar searchParams={searchParams} />
              </div>

              {/* Sort */}
              <SortDropdown current={searchParams.sort ?? "featured"} />
            </div>

            {/* Product grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Skeleton loader shown during streaming ── */
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="skeleton aspect-product rounded-md" />
          <div className="skeleton h-3 rounded w-3/4" />
          <div className="skeleton h-3 rounded w-1/2" />
          <div className="skeleton h-3 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}
