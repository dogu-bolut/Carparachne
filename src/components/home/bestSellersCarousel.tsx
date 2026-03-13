"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/shared/productCard";
import type { Product } from "@/lib/types";
const MOCK_NAMES = [
  "The Linen Overshirt",
  "Merino Crewneck",
  "Canvas Tote",
  "Leather Card Holder",
  "Ceramic Mug Set",
  "Silk Scarf",
  "Wool Blanket",
  "Bamboo Candle",
] as const;

const MOCK_PRICES = [129, 195, 75, 85, 110, 145, 220, 55] as const;
const MOCK_COMPARE_AT = [165, 245, 95, 0, 0, 0, 280, 0] as const;

/* Mock data — replace by passing products as a prop from an async RSC parent */
const MOCK_BESTSELLERS: Product[] = Array.from({ length: 8 }, (_, i) => {
  const price = MOCK_PRICES[i] ?? 0;
  const compare = MOCK_COMPARE_AT[i];
  const badge = i === 0 ? "bestseller" : i % 4 === 3 ? "new" : undefined;

  return {
    id:               `bs-${i}`,
    slug:             `product-${i + 1}`,
    name:             MOCK_NAMES[i] ?? "Atelier Product",
    brand:            "Atelier",
    description:      "",
    shortDescription: "",
    price,
    compareAtPrice:   typeof compare === "number" && compare > 0 ? compare : price,
    currency:         "EUR",
    images:           [{ id: `img-${i}`, src: `/images/product-${i + 1}.jpg`, altText: "", width: 800, height: 1067 }],
    variants:         [],
    specs:            [],
    categorySlug:     "clothing",
    tags:             [],
    ...(badge ? { badge } : {}),
    rating:           4 + Math.round(Math.random()),
    reviewCount:      20 + i * 7,
    inStock:          i !== 5,
    relatedProductIds:[],
    seo:              { title: "", description: "" },
  };
});
interface Props {
  products?: Product[];
}

export function BestSellersCarousel({ products = MOCK_BESTSELLERS }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = (firstCard?.offsetWidth ?? 280) + 16; // gap-4 = 16px
    trackRef.current.scrollBy({ left: dir === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
  }

  return (
    <div className="relative group/carousel">
      {/* ── Scroll track ── */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
        role="list"
        aria-label="Best-selling products"
      >
        {products.map((product, i) => (
          <div
            key={product.id}
            role="listitem"
            className="flex-shrink-0 w-[240px] sm:w-[270px] lg:w-[290px] snap-start"
          >
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>

      {/* ── Left arrow ── */}
      <button
        onClick={() => scroll("left")}
        className="
          absolute -left-5 top-[38%] -translate-y-1/2
          hidden lg:flex
          w-10 h-10 rounded-full
          bg-surface-raised shadow-card-hover
          items-center justify-center
          text-ink-soft hover:text-accent
          opacity-0 group-hover/carousel:opacity-100
          transition-all duration-200
          z-raised
        "
        aria-label="Scroll carousel left"
      >
        <ChevronLeft size={18} />
      </button>

      {/* ── Right arrow ── */}
      <button
        onClick={() => scroll("right")}
        className="
          absolute -right-5 top-[38%] -translate-y-1/2
          hidden lg:flex
          w-10 h-10 rounded-full
          bg-surface-raised shadow-card-hover
          items-center justify-center
          text-ink-soft hover:text-accent
          opacity-0 group-hover/carousel:opacity-100
          transition-all duration-200
          z-raised
        "
        aria-label="Scroll carousel right"
      >
        <ChevronRight size={18} />
      </button>

      {/* ── Edge fade masks (visual hint that content overflows) ── */}
      <div
        className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface-sunken to-transparent pointer-events-none"
        aria-hidden
      />
    </div>
  );
}
