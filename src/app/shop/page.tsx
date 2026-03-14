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

// 1. Extract the shape of your search params
type SearchParamsType = {
  sort?:        string;
  categories?:  string;   // comma-separated slugs
  minPrice?:    string;
  maxPrice?:    string;
  tags?:        string;
  inStock?:     string;
  page?:        string;
  badge?:       string;
};

// 2. Define the props with searchParams as a Promise
interface ShopPageProps {
  searchParams: Promise<SearchParamsType>;
}

// 3. Make the component async
export default async function ShopPage({ searchParams }: ShopPageProps) {
  // 4. Await the searchParams promise to get the actual values
  const resolvedParams = await searchParams;

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
            {/* Pass the resolved params down so child components remain synchronous */}
            <FilterSidebar searchParams={resolvedParams} />
          </aside>

          {/* ── Right: controls + grid ── */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 gap-4">
              {/* Mobile filter trigger */}
              <MobileFilterSheet searchParams={resolvedParams} />

              {/* Active filter chips */}
              <div className="flex-1 min-w-0">
                <ActiveFilterBar searchParams={resolvedParams} />
              </div>

              {/* Sort */}
              <SortDropdown current={resolvedParams.sort ?? "featured"} />
            </div>

            {/* Product grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid searchParams={resolvedParams} />
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