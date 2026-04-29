"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/shared/productCard";
import type { Product } from "@/lib/types";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
}

export function ProductCarousel({ products, title }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // If no products are passed, don't render anything
  if (!products || products.length === 0) return null;

  return (
    <div className="relative group/carousel">
      {/* Optional Title */}
      {title && (
        <h2 className="text-2xl font-semibold mb-8">{title}</h2>
      )}

      {/* ── Scroll container ── */}
      <div
        ref={scrollRef}
        className="
          flex gap-4 lg:gap-6 
          overflow-x-auto snap-x snap-mandatory 
          scrollbar-hide pb-4 items-stretch
        "
      >
        {products.map((product, i) => (
          <div 
            key={product.id} 
            className="snap-start shrink-0 w-[280px] lg:w-[320px] flex"
          >
            {/* The flex-1 w-full ensures the container fills the stretched height */}
            <div className="flex-1 w-full">
              <ProductCard product={product} index={i} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Left arrow ── */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-5 top-[45%] -translate-y-1/2 hidden lg:flex w-10 h-10 rounded-full bg-surface-raised shadow-card-hover items-center justify-center text-ink-soft hover:text-accent opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 z-raised"
        aria-label="Scroll carousel left"
      >
        <ChevronLeft size={18} />
      </button>

      {/* ── Right arrow ── */}
      <button
        onClick={() => scroll("right")}
        className="absolute -right-5 top-[45%] -translate-y-1/2 hidden lg:flex w-10 h-10 rounded-full bg-surface-raised shadow-card-hover items-center justify-center text-ink-soft hover:text-accent opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 z-raised"
        aria-label="Scroll carousel right"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
