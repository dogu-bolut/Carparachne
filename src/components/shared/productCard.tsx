"use client";

import Image     from "next/image";
import Link      from "next/link";
import { useState, useEffect } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/stores/cartStore";
import { formatPrice }  from "@/lib/utils/index";

interface ProductCardProps {
  product: Product;
  /** Disables hover-swap image; useful on mobile / list view */
  disableImageSwap?: boolean;
  /** Index for staggered entrance animation */
  index?: number;
}

const BADGE_STYLES: Record<string, string> = {
  new:        "badge badge-accent",
  sale:       "badge bg-error-light text-error",
  bestseller: "badge badge-neutral",
  "low-stock":"badge bg-warning-light text-warning",
  "sold-out": "badge bg-ink-line text-ink-muted",
};

export function ProductCard({
  product,
  disableImageSwap = false,
  index = 0,
}: ProductCardProps) {
  const [hovered, setHovered]     = useState(false);
  const [wishlisted, setWish]     = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { addItem, openCart }     = useCartStore();

  // Mount flag to safely render random client data
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const primaryImage   = product.images[0] ?? {
    id: "placeholder",
    src: "/images/product-placeholder.jpg",
    altText: product.name,
    width: 800,
    height: 800,
  };
  const secondaryImage = product.images[1];
  const showAltImage   = hovered && !disableImageSwap && secondaryImage;

  const discountPct = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null;

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault(); // don't navigate to PDP
    addItem({
      productId: product.id,
      slug:      product.slug,
      name:      product.name,
      image:     primaryImage,
      price:     product.price,
      currency:  product.currency,
      quantity:  1,
      selectedVariants: {} as any, // quick-add uses defaults
    });
    openCart();
  }

  return (
    <article
      className={`product-card group animate-fade-up`}
      style={{ animationDelay: `${index * 75}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={product.name}
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* ── Image container ── */}
        <div className="relative aspect-product overflow-hidden bg-surface-sunken">
          {/* Primary image */}
          <Image
            src={primaryImage.src}
            alt={primaryImage.altText}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={85}
            className={`
              object-cover object-center
              transition-all duration-500 ease-out-expo
              ${showAltImage ? "opacity-0 scale-105" : "opacity-100 scale-100"}
            `}
          />

          {/* Secondary hover image (if available) */}
          {secondaryImage && (
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.altText}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={80}
              className={`
                absolute inset-0 object-cover object-center
                transition-all duration-500 ease-out-expo
                ${showAltImage ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
            />
          )}

          {/* ── Badge ── */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 ${BADGE_STYLES[product.badge]}`}
              aria-label={product.badge}
            >
              {product.badge === "sale" && discountPct
                ? `−${discountPct}%`
                : product.badge.replace("-", " ")}
            </span>
          )}

          {/* ── Wishlist button ── */}
          <button
            onClick={(e) => { e.preventDefault(); setWish(!wishlisted); }}
            className={`
              absolute top-3 right-3 p-2 rounded-full
              bg-surface-raised/80 backdrop-blur-sm
              transition-all duration-200
              opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
              ${wishlisted ? "text-error" : "text-ink-muted hover:text-ink"}
            `}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
          >
            <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
          </button>

          {/* ── Quick-add (desktop hover) ── */}
          {product.inStock && (
            <button
              onClick={handleQuickAdd}
              className={`
                absolute bottom-0 left-0 right-0
                bg-ink text-white
                flex items-center justify-center gap-2
                py-3 text-xs font-medium uppercase tracking-wider
                transition-all duration-300 ease-out-expo
                opacity-0 translate-y-2
                group-hover:opacity-100 group-hover:translate-y-0
              `}
              aria-label={`Quick add ${product.name} to cart`}
            >
              <ShoppingBag size={14} />
              Quick Add
            </button>
          )}

          {/* Sold out overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-surface-raised/50 flex items-center justify-center">
              <span className="badge badge-neutral">Sold Out</span>
            </div>
          )}
        </div>

        {/* ── Card body ── */}
        <div className="p-4">
          {product.brand && (
            <p className="label-caps text-ink-ghost mb-1">{product.brand}</p>
          )}
          <h3 className="text-sm font-medium text-ink-soft leading-snug mb-2 line-clamp-2 font-sans">
            {product.name}
          </h3>

          {/* Star rating */}
          {(product.reviewCount || 0) > 0 && (
            <div 
              className="flex items-center gap-1.5 mb-2" 
              aria-label={`${product.rating} out of 5 stars`}
              suppressHydrationWarning
            >
              <div className="flex gap-0.5" aria-hidden suppressHydrationWarning>
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    suppressHydrationWarning
                    className={`w-3 h-3 ${i < Math.round(product.rating || 0) ? "text-accent" : "text-ink-line"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-ink-ghost">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-ink-soft">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price &&(
              <span className="text-ink-muted line-through text-sm">
                {formatPrice(product.compareAtPrice, product.currency)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}