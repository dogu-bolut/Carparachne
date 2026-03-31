"use client";

import { useEffect, useRef, useState } from "react";
import Link  from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore }  from "@/lib/stores/cartStore";
import { formatPrice }   from "@/lib/utils/index";
import type { CartItem } from "@/lib/types";

export function CartDrawer() {
  const {
    isOpen, closeCart,
    items, subtotal, itemCount,
    removeItem, updateQuantity,
  } = useCartStore();

  // Don't render at all on SSR — prevents hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and focus trap
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeCart]);

  // Nothing rendered until JS hydrates
  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeCart}
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            backgroundColor: "rgba(26,26,26,0.48)",
            animation: "fade-in 200ms ease both",
          }}
        />
      )}

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        style={{
          position:    "fixed",
          top:         0,
          right:       0,
          bottom:      0,
          zIndex:      60,
          width:       "min(420px, 100vw)",
          backgroundColor: "#FFFFFF",
          boxShadow:   "-4px 0 32px rgba(26,26,26,0.12)",
          display:     "flex",
          flexDirection: "column",
          outline:     "none",
          transform:   isOpen ? "translateX(0)" : "translateX(100%)",
          transition:  "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid #D4D4D4",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.625rem" }}>
            <ShoppingBag size={18} color="#2C2C2C" />
            <h2 style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "#2C2C2C", margin: 0 }}>
              Your Cart
            </h2>
            {itemCount > 0 && (
              <span className="badge badge-neutral">{itemCount}</span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="btn-ghost"
            style={{ padding: "0.375rem" }}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items / empty state */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {items.length === 0 ? (
            <EmptyCart onClose={closeCart} />
          ) : (
            <ul style={{ margin: 0, padding: "0 1.5rem" }} aria-label="Cart items">
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

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            borderTop: "1px solid #D4D4D4",
            padding: "1.5rem",
            backgroundColor: "#F7F6F4",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: "0.375rem" }}>
              <span style={{ fontSize: "0.875rem", color: "#5A5A5A" }}>Subtotal</span>
              <span style={{ fontSize: "1rem", fontWeight: 600, color: "#2C2C2C" }}>
                {formatPrice(subtotal, items[0]?.currency ?? "EUR")}
              </span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#9A9A9A", marginBottom: "1.25rem" }}>
              Shipping and taxes calculated at checkout.
            </p>
            {/* Primary CTA — checkout */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", gap: "0.5rem" }}
            >
              Proceed to Checkout <ArrowRight size={15} />
            </Link>
            {/* Secondary CTA — view full cart page */}
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-secondary"
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: "0.625rem",
                fontSize: "0.8125rem",
              }}
            >
              View Cart
            </Link>
            <button
              onClick={closeCart}
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "0.8125rem",
                color: "#9A9A9A",
                marginTop: "0.625rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.25rem",
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ── Line item ── */
function CartLineItem({
  item, onRemove, onChangeQty,
}: {
  item: CartItem;
  onRemove: () => void;
  onChangeQty: (q: number) => void;
}) {
  const variantLabel = Object.values(item.selectedVariants).filter(Boolean).join(" / ");

  return (
    <li style={{ display: "flex", flexDirection: "row", gap: "1rem", padding: "1.25rem 0", borderBottom: "1px solid rgba(212,212,212,0.5)" }}>
      <Link href={`/products/${item.slug}`} style={{ position: "relative", flexShrink: 0, width: 80, height: 96, borderRadius: 6, overflow: "hidden", backgroundColor: "#EFEDE9", display: "block" }}>
        <Image src={item.image.src} alt={item.image.altText} fill sizes="80px" quality={70} className="object-cover" />
      </Link>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <Link
            href={`/products/${item.slug}`}
            style={{ fontSize: "0.875rem", fontWeight: 500, color: "#2C2C2C", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
            className="hover:text-[#C8976A] transition-colors"
          >
            {item.name}
          </Link>
          {variantLabel && (
            <p style={{ fontSize: "0.75rem", color: "#9A9A9A", marginTop: "0.125rem" }}>{variantLabel}</p>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "0.75rem" }}>
          {/* Qty */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", border: "1px solid #D4D4D4", borderRadius: 4 }}>
            <button onClick={() => onChangeQty(item.quantity - 1)} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "#9A9A9A", borderRadius: "4px 0 0 4px" }} aria-label="Decrease quantity" className="hover:bg-[#EFEDE9] hover:text-[#1A1A1A] transition-colors">
              <Minus size={11} />
            </button>
            <span style={{ width: 28, textAlign: "center", fontSize: "0.75rem", fontWeight: 500, color: "#2C2C2C" }}>{item.quantity}</span>
            <button onClick={() => onChangeQty(item.quantity + 1)} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "#9A9A9A", borderRadius: "0 4px 4px 0" }} aria-label="Increase quantity" className="hover:bg-[#EFEDE9] hover:text-[#1A1A1A] transition-colors">
              <Plus size={11} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2C2C2C" }}>
              {formatPrice(item.price * item.quantity, item.currency)}
            </span>
            <button onClick={onRemove} style={{ color: "#9A9A9A" }} aria-label={`Remove ${item.name}`} className="hover:text-[#C04040] transition-colors">
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "1.25rem", padding: "4rem 2rem", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, backgroundColor: "#EFEDE9", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ShoppingBag size={24} color="#9A9A9A" />
      </div>
      <div>
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "#2C2C2C", marginBottom: "0.5rem" }}>Your cart is empty</h3>
        <p style={{ fontSize: "0.875rem", color: "#5A5A5A", lineHeight: 1.6, maxWidth: "22ch", margin: "0 auto" }}>
          Looks like you haven't added anything yet. Explore our collections to get started.
        </p>
      </div>
      <Link href="/shop" onClick={onClose} className="btn-primary" style={{ marginTop: "0.5rem" }}>
        Start Shopping
      </Link>
    </div>
  );
}
