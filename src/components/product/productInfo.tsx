// src/components/product/ProductInfo.tsx
// ─── Right panel of PDP: name, price, variant selectors, ATC button ─────────
"use client";

import { useState } from "react";
import { ShoppingBag, Truck, RotateCcw, Star } from "lucide-react";
import type { Product, VariantOption } from "@/lib/types";
import { useCartStore } from "@/lib/stores/cartStore";
import { formatPrice }  from "@/lib/utils/index";

export function ProductInfo({ product }: { product: Product }) {
  const { addItem, openCart } = useCartStore();

  /* Track selected variant values: { size: "M", color: "ivory", ... } */
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    product.variants.forEach((v) => {
      const inStock = v.options.find((o) => o.inStock);
      if (inStock) defaults[v.type] = inStock.value;
    });
    return defaults;
  });

  const [qty,     setQty]     = useState(1);
  const [adding,  setAdding]  = useState(false);

  const discountPct = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null;

  async function handleAddToCart() {
    setAdding(true);
    const fallbackImage =
      product.images[0] ??
      {
        id: "placeholder",
        src: "/images/product-placeholder.jpg",
        altText: product.name,
        width: 800,
        height: 800,
      };

    addItem({
      productId: product.id,
      slug:      product.slug,
      name:      product.name,
      image:     fallbackImage,
      price:     product.price,
      currency:  product.currency,
      quantity:  qty,
      selectedVariants: selected as any,
    });
    await new Promise((r) => setTimeout(r, 600));
    setAdding(false);
    openCart();
  }

  return (
    <div>
      {/* Badge + brand */}
      <div className="flex items-center gap-3 mb-3">
        {product.brand && (
          <span className="label-caps text-ink-ghost">{product.brand}</span>
        )}
        {product.badge && (
          <span className={`badge ${product.badge === "new" ? "badge-accent" : "badge-neutral"}`}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h1
        id="product-title"
        className="text-2xl lg:text-3xl xl:text-4xl font-display font-normal leading-snug text-ink-soft mb-4"
      >
        {product.name}
      </h1>

      {/* Rating */}
      {product.reviewCount > 0 && (
        <div className="flex items-center gap-2 mb-5">
          <div className="flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.round(product.rating) ? "text-accent fill-accent" : "text-ink-line fill-ink-line"}
              />
            ))}
          </div>
          <a
            href="#reviews"
            className="text-sm text-ink-muted hover:text-ink underline underline-offset-2 transition-colors"
          >
            {product.rating.toFixed(1)} ({product.reviewCount} reviews)
          </a>
        </div>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-2xl font-semibold text-ink-soft">
          {formatPrice(product.price, product.currency)}
        </span>
        {product.compareAtPrice && (
          <>
            <span className="text-base text-ink-ghost line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </span>
            {discountPct && (
              <span className="badge badge-accent">−{discountPct}%</span>
            )}
          </>
        )}
      </div>

      {/* Short description */}
      {product.shortDescription && (
        <p className="text-sm leading-relaxed text-ink-muted mb-7">
          {product.shortDescription}
        </p>
      )}

      {/* ── Variant selectors ── */}
      {product.variants.map((variant) => (
        <div key={variant.id} className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="label-caps text-ink-soft">
              {variant.name}
              {selected[variant.type] && (
                <span className="normal-case font-normal text-ink-muted ml-2">
                  : {selected[variant.type]}
                </span>
              )}
            </label>
            {variant.type === "size" && (
              <button className="text-xs text-ink-ghost underline hover:text-accent transition-colors">
                Size guide
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {variant.type === "color"
              ? variant.options.map((opt) => (
                  <ColorSwatch
                    key={opt.value}
                    opt={opt}
                    selected={selected[variant.type] === opt.value}
                    onSelect={() =>
                      setSelected((s) => ({ ...s, [variant.type]: opt.value }))
                    }
                  />
                ))
              : variant.options.map((opt) => (
                  <SizeButton
                    key={opt.value}
                    opt={opt}
                    selected={selected[variant.type] === opt.value}
                    onSelect={() =>
                      setSelected((s) => ({ ...s, [variant.type]: opt.value }))
                    }
                  />
                ))}
          </div>
        </div>
      ))}

      {/* ── Quantity + ATC ── */}
      <div className="flex gap-3 mb-6">
        {/* Qty stepper */}
        <div className="flex items-center border border-ink-line rounded h-12">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-full flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-sunken rounded-l transition-colors"
            aria-label="Decrease quantity"
            disabled={qty <= 1}
          >
            −
          </button>
          <span
            className="w-10 text-center text-sm font-medium text-ink-soft"
            aria-live="polite"
            aria-label={`Quantity: ${qty}`}
          >
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-10 h-full flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-sunken rounded-r transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || adding}
          className={`
            flex-1 flex items-center justify-center gap-2.5 h-12 rounded
            font-sans text-sm font-medium uppercase tracking-wider
            transition-all duration-200
            ${product.inStock
              ? adding
                ? "bg-accent text-white cursor-wait"
                : "btn-primary flex-1 h-12"
              : "bg-surface-sunken text-ink-ghost cursor-not-allowed"}
          `}
          aria-label={product.inStock ? "Add to cart" : "Out of stock"}
        >
          <ShoppingBag size={16} />
          {!product.inStock ? "Sold Out" : adding ? "Adding…" : "Add to Cart"}
        </button>
      </div>

      {/* Trust signals */}
      <div className="flex flex-col gap-3 py-5 border-t border-ink-line">
        {[
          { Icon: Truck,       text: "Free shipping on orders over $75" },
          { Icon: RotateCcw,   text: "Free returns within 30 days" },
        ].map(({ Icon, text }) => (
          <div key={text} className="flex items-center gap-3 text-sm text-ink-muted">
            <Icon size={15} className="text-ink-ghost flex-shrink-0" />
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Color swatch ── */
function ColorSwatch({
  opt, selected, onSelect,
}: { opt: VariantOption; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      disabled={!opt.inStock}
      title={opt.label}
      aria-label={`Color: ${opt.label}${!opt.inStock ? " (out of stock)" : ""}`}
      aria-pressed={selected}
      className={`
        relative w-8 h-8 rounded-full border-2 transition-all duration-150
        ${selected ? "border-ink scale-110" : "border-transparent hover:border-ink-ghost"}
        ${!opt.inStock ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
      `}
      style={{ backgroundColor: opt.hex ?? opt.value }}
    >
      {!opt.inStock && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-full h-px bg-ink-ghost rotate-45 block" />
        </span>
      )}
    </button>
  );
}

/* ── Size button ── */
function SizeButton({
  opt, selected, onSelect,
}: { opt: VariantOption; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      disabled={!opt.inStock}
      aria-label={`Size: ${opt.label}${!opt.inStock ? " (out of stock)" : ""}`}
      aria-pressed={selected}
      className={`
        min-w-[44px] px-3 py-2 text-sm border rounded transition-all duration-150
        ${selected
          ? "bg-ink text-white border-ink"
          : opt.inStock
            ? "bg-surface-raised text-ink-soft border-ink-line hover:border-ink"
            : "bg-surface-sunken text-ink-ghost border-ink-line cursor-not-allowed line-through"}
      `}
    >
      {opt.label}
    </button>
  );
}
