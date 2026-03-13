"use client";

import { useEffect, useRef } from "react";
import Link  from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore }   from "@/lib/stores/cartStore";
import { formatPrice }    from "@/lib/utils/index";
import type { CartItem }  from "@/lib/types";

export function CartDrawer() {
  const {
    isOpen, closeCart,
    items, subtotal, itemCount,
    removeItem, updateQuantity,
  } = useCartStore();

  /* Trap focus + lock body scroll */
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const prevFocus = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      prevFocus?.focus();
    };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeCart]);

  return (
    <>
      {/* ── Backdrop ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-overlay bg-surface-overlay animate-fade-in"
          onClick={closeCart}
          aria-hidden
        />
      )}

      {/* ── Drawer panel ── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        className={`
          fixed right-0 top-0 bottom-0 z-drawer
          w-full sm:w-[420px] max-w-[100vw]
          bg-surface-raised shadow-drawer
          flex flex-col
          transition-transform duration-350 ease-out-expo
          outline-none
          ${isOpen ? "translate-x-0 animate-slide-in-right" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-line">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-ink-soft" />
            <h2 className="font-sans text-base font-semibold text-ink-soft">
              Your Cart
            </h2>
            {itemCount > 0 && (
              <span className="badge badge-neutral">{itemCount}</span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="btn-ghost p-1.5"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Items or empty state ── */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <EmptyCart onClose={closeCart} />
          ) : (
            <ul className="divide-y divide-ink-line/50 px-6" aria-label="Cart items">
              {items.map((item) => (
                <CartLineItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onChangeQty={(q) => updateQuantity(item.id, q)}
                />
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer: subtotal + CTA ── */}
        {items.length > 0 && (
          <div className="border-t border-ink-line px-6 py-6 bg-surface">
            {/* Subtotal row */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-ink-muted">Subtotal</span>
              <span className="text-base font-semibold text-ink-soft">
                {formatPrice(subtotal, items[0]?.currency ?? "USD")}
              </span>
            </div>
            <p className="text-xs text-ink-ghost mb-5">
              Shipping and taxes calculated at checkout.
            </p>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
            >
              Proceed to Checkout
              <ArrowRight size={15} />
            </Link>

            {/* Continue shopping */}
            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-ink-muted hover:text-ink mt-3 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ── Single cart line item ── */
function CartLineItem({
  item,
  onRemove,
  onChangeQty,
}: {
  item: CartItem;
  onRemove: () => void;
  onChangeQty: (q: number) => void;
}) {
  const variantLabel = Object.values(item.selectedVariants)
    .filter(Boolean)
    .join(" / ");

  return (
    <li className="flex gap-4 py-5">
      {/* Thumbnail */}
      <Link
        href={`/products/${item.slug}`}
        className="relative flex-shrink-0 w-20 h-24 rounded overflow-hidden bg-surface-sunken"
      >
        <Image
          src={item.image.src}
          alt={item.image.altText}
          fill
          sizes="80px"
          quality={70}
          className="object-cover"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${item.slug}`}
            className="text-sm font-medium text-ink-soft leading-snug hover:text-accent transition-colors line-clamp-2"
          >
            {item.name}
          </Link>
          {variantLabel && (
            <p className="text-xs text-ink-ghost mt-0.5">{variantLabel}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Qty stepper */}
          <div className="flex items-center border border-ink-line rounded">
            <button
              onClick={() => onChangeQty(item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-sunken rounded-l transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={11} />
            </button>
            <span className="w-7 text-center text-xs font-medium text-ink-soft">
              {item.quantity}
            </span>
            <button
              onClick={() => onChangeQty(item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-sunken rounded-r transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={11} />
            </button>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-ink-soft">
              {formatPrice(item.price * item.quantity, item.currency)}
            </span>
            <button
              onClick={onRemove}
              className="text-ink-ghost hover:text-error transition-colors"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

/* ── Empty state ── */
function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center py-16">
      <div className="w-16 h-16 bg-surface-sunken rounded-full flex items-center justify-center">
        <ShoppingBag size={24} className="text-ink-ghost" />
      </div>
      <div>
        <h3 className="font-sans text-base font-semibold text-ink-soft mb-2">
          Your cart is empty
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed">
          Looks like you haven't added anything yet. Explore our collections to get started.
        </p>
      </div>
      <Link
        href="/shop"
        onClick={onClose}
        className="btn-primary mt-2"
      >
        Start Shopping
      </Link>
    </div>
  );
}
