"use client";

import { useState, useEffect } from "react";
import Link  from "next/link";
import Image from "next/image";
import {
  Minus, Plus, Trash2, ArrowRight,
  ShoppingBag, Tag, ChevronRight, Truck,
  RotateCcw, ShieldCheck,
} from "lucide-react";
import { useCartStore }  from "@/lib/stores/cartStore";
import { formatPrice }   from "@/lib/utils/index";
import type { CartItem } from "@/lib/types";

/* ── Promo code stub — wire to real API in production ── */
const VALID_CODES: Record<string, number> = {
  WELCOME10: 10,
  SUMMER15:  15,
  CARPA20:   20,
};

export function CartPageClient() {
  const {
    items, subtotal, itemCount,
    removeItem, updateQuantity, clearCart,
  } = useCartStore();

  const [mounted,    setMounted]    = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoCode,  setPromoCode]  = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Prevent hydration mismatch — same pattern as CartDrawer
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <CartPageSkeleton />;
  }

  /* ── Promo logic ── */
  const discountPct = promoCode ? (VALID_CODES[promoCode] ?? 0) : 0;
  const discountAmt = subtotal * (discountPct / 100);
  const shipping    = subtotal >= 75 ? 0 : 8.95;
  const total       = subtotal - discountAmt + shipping;
  const currency    = items[0]?.currency ?? "EUR";

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (VALID_CODES[code]) {
      setPromoCode(code);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Please try again.");
      setPromoCode(null);
      setPromoApplied(false);
    }
  }

  function removePromo() {
    setPromoCode(null);
    setPromoInput("");
    setPromoApplied(false);
    setPromoError("");
  }

  /* ── Empty state ── */
  if (items.length === 0) {
    return <EmptyCartPage />;
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* ── Page header ── */}
      <div className="bg-surface-raised border-b border-ink-line">
        <div className="container-site py-8 lg:py-10">
          <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
            <h1>Your Cart</h1>
            <span className="label-caps text-ink-ghost" style={{ fontSize: "0.75rem" }}>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="container-site py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 xl:gap-12 items-start">

          {/* ══════════════════════════════════════════
              LEFT — Item list
          ══════════════════════════════════════════ */}
          <div>
            {/* Column headers — desktop only */}
            <div
              className="hidden md:grid mb-4 pb-3 border-b border-ink-line"
              style={{ gridTemplateColumns: "1fr 120px 120px 40px", gap: "1rem" }}
            >
              <span className="label-caps text-ink-ghost">Product</span>
              <span className="label-caps text-ink-ghost text-center">Quantity</span>
              <span className="label-caps text-ink-ghost text-right">Total</span>
              <span />
            </div>

            {/* Items */}
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {items.map((item, i) => (
                <CartRow
                  key={item.id}
                  item={item}
                  isLast={i === items.length - 1}
                  onRemove={() => removeItem(item.id)}
                  onChangeQty={(q) => updateQuantity(item.id, q)}
                />
              ))}
            </ul>

            {/* Bottom actions */}
            <div
              className="mt-6 pt-5 border-t border-ink-line"
              style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}
            >
              <Link
                href="/shop"
                className="label-caps text-ink-muted hover:text-ink transition-colors"
                style={{ display: "inline-flex", flexDirection: "row", alignItems: "center", gap: "0.375rem" }}
              >
                ← Continue Shopping
              </Link>

              <button
                onClick={() => {
                  if (confirm("Remove all items from your cart?")) clearCart();
                }}
                className="label-caps text-ink-ghost hover:text-error transition-colors"
                style={{ display: "inline-flex", flexDirection: "row", alignItems: "center", gap: "0.375rem" }}
              >
                <Trash2 size={12} />
                Clear cart
              </button>
            </div>

            {/* Trust signals — mobile only (shown below items) */}
            <div className="mt-8 lg:hidden">
              <TrustSignals />
            </div>
          </div>

          {/* ══════════════════════════════════════════
              RIGHT — Order summary (sticky)
          ══════════════════════════════════════════ */}
          <div className="lg:sticky lg:top-24">
            <div
              className="bg-surface-raised border border-ink-line rounded-lg overflow-hidden"
              style={{ boxShadow: "var(--shadow-card-rest)" }}
            >
              {/* Summary header */}
              <div className="px-6 py-5 border-b border-ink-line">
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#2C2C2C",
                    margin: 0,
                  }}
                >
                  Order Summary
                </h2>
              </div>

              <div className="px-6 py-5">
                {/* Line items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  <SummaryRow
                    label={`Subtotal (${itemCount} ${itemCount === 1 ? "item" : "items"})`}
                    value={formatPrice(subtotal, currency)}
                  />

                  {promoApplied && promoCode && (
                    <SummaryRow
                      label={`Promo (${promoCode} −${discountPct}%)`}
                      value={`−${formatPrice(discountAmt, currency)}`}
                      highlight
                    />
                  )}

                  <SummaryRow
                    label="Shipping"
                    value={
                      shipping === 0
                        ? "Free"
                        : formatPrice(shipping, currency)
                    }
                    {...(shipping > 0
                      ? { subLabel: `Free on orders over ${formatPrice(75, currency)}` }
                      : {})}
                    valueHighlight={shipping === 0}
                  />
                </div>

                <hr className="my-5" />

                {/* Total */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "#1A1A1A",
                    }}
                  >
                    Estimated Total
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      color: "#1A1A1A",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {formatPrice(total, currency)}
                  </span>
                </div>

                {/* Promo code */}
                <div className="mb-5">
                  {promoApplied ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.625rem 0.875rem",
                        backgroundColor: "#E6F4EF",
                        borderRadius: "4px",
                        border: "1px solid #3D7A5F",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
                        <Tag size={14} color="#3D7A5F" />
                        <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#3D7A5F" }}>
                          {promoCode} applied — {discountPct}% off
                        </span>
                      </div>
                      <button
                        onClick={removePromo}
                        style={{ fontSize: "0.75rem", color: "#3D7A5F", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
                        <div style={{ position: "relative", flex: 1 }}>
                          <Tag
                            size={14}
                            style={{
                              position: "absolute",
                              left: "0.75rem",
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "#9A9A9A",
                              pointerEvents: "none",
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Promo code"
                            value={promoInput}
                            onChange={(e) => {
                              setPromoInput(e.target.value);
                              setPromoError("");
                            }}
                            onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                            style={{ paddingLeft: "2.25rem", fontSize: "0.875rem" }}
                            aria-label="Promo code"
                          />
                        </div>
                        <button
                          onClick={applyPromo}
                          className="btn-secondary"
                          style={{ padding: "0.625rem 1rem", fontSize: "0.8125rem", whiteSpace: "nowrap" }}
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p style={{ fontSize: "0.75rem", color: "#C04040", marginTop: "0.375rem" }}>
                          {promoError}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                    padding: "0.9375rem 1.5rem",
                  }}
                >
                  Proceed to Checkout
                  <ArrowRight size={15} />
                </Link>

                <p
                  style={{
                    fontSize: "0.6875rem",
                    color: "#9A9A9A",
                    textAlign: "center",
                    marginTop: "0.75rem",
                    lineHeight: 1.6,
                  }}
                >
                  Taxes calculated at checkout. By continuing you agree to our{" "}
                  <Link href="/policies/terms" style={{ textDecoration: "underline" }} className="hover:text-accent transition-colors">
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link href="/policies/privacy" style={{ textDecoration: "underline" }} className="hover:text-accent transition-colors">
                    Privacy Policy
                  </Link>.
                </p>
              </div>

              {/* Trust signals — desktop inside card */}
              <div className="hidden lg:block border-t border-ink-line px-6 py-5">
                <TrustSignals compact />
              </div>
            </div>

            {/* "You may also like" nudge */}
            <div className="mt-5 text-center">
              <Link
                href="/shop"
                className="label-caps text-ink-muted hover:text-ink transition-colors"
                style={{ display: "inline-flex", flexDirection: "row", alignItems: "center", gap: "0.375rem" }}
              >
                Keep browsing
                <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Cart row — single line item
══════════════════════════════════════════ */
function CartRow({
  item, isLast, onRemove, onChangeQty,
}: {
  item: CartItem;
  isLast: boolean;
  onRemove: () => void;
  onChangeQty: (q: number) => void;
}) {
  const variantLabel = Object.values(item.selectedVariants)
    .filter(Boolean)
    .join(" / ");

  return (
    <li
      style={{
        display:       "grid",
        gridTemplateColumns: "auto 1fr",
        gap:           "1.25rem",
        paddingTop:    "1.5rem",
        paddingBottom: "1.5rem",
        borderBottom:  isLast ? "none" : "1px solid #D4D4D4",
      }}
    >
      {/* Thumbnail */}
      <Link
        href={`/products/${item.slug}`}
        style={{
          position:        "relative",
          flexShrink:      0,
          width:           96,
          height:          120,
          borderRadius:    6,
          overflow:        "hidden",
          backgroundColor: "#EFEDE9",
          display:         "block",
          border:          "1px solid #D4D4D4",
        }}
      >
        <Image
          src={item.image.src}
          alt={item.image.altText}
          fill
          sizes="96px"
          quality={75}
          className="object-cover"
        />
      </Link>

      {/* Info + controls */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
        {/* Top: name, variant, price */}
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "1rem", alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Link
              href={`/products/${item.slug}`}
              style={{
                fontFamily:     "var(--font-body)",
                fontSize:       "0.9375rem",
                fontWeight:     500,
                color:          "#2C2C2C",
                lineHeight:     1.35,
                display:        "block",
              }}
              className="hover:text-[#C8976A] transition-colors"
            >
              {item.name}
            </Link>
            {variantLabel && (
              <p style={{ fontSize: "0.8125rem", color: "#9A9A9A", marginTop: "0.25rem" }}>
                {variantLabel}
              </p>
            )}
            {/* Unit price — always visible */}
            <p style={{ fontSize: "0.8125rem", color: "#5A5A5A", marginTop: "0.375rem" }}>
              {formatPrice(item.price, item.currency)} each
            </p>
          </div>

          {/* Line total — desktop */}
          <div className="hidden md:block" style={{ textAlign: "right", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: 600, color: "#1A1A1A" }}>
              {formatPrice(item.price * item.quantity, item.currency)}
            </span>
          </div>
        </div>

        {/* Bottom: qty stepper + remove */}
        <div
          style={{
            display:        "flex",
            flexDirection:  "row",
            alignItems:     "center",
            justifyContent: "space-between",
            marginTop:      "0.875rem",
          }}
        >
          {/* Qty stepper */}
          <div
            style={{
              display:      "flex",
              flexDirection:"row",
              alignItems:   "center",
              border:       "1px solid #D4D4D4",
              borderRadius: 4,
              overflow:     "hidden",
            }}
          >
            <button
              onClick={() => onChangeQty(item.quantity - 1)}
              disabled={item.quantity <= 1}
              style={{
                width: 36, height: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: item.quantity <= 1 ? "#D4D4D4" : "#5A5A5A",
                background: "none",
                cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                transition: "background-color 150ms ease",
              }}
              className="hover:bg-[#EFEDE9]"
              aria-label="Decrease quantity"
            >
              <Minus size={13} />
            </button>

            <span
              style={{
                width: 44, textAlign: "center",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem", fontWeight: 500,
                color: "#1A1A1A",
                borderLeft: "1px solid #D4D4D4",
                borderRight: "1px solid #D4D4D4",
                lineHeight: "36px",
                userSelect: "none",
              }}
              aria-label={`Quantity: ${item.quantity}`}
              aria-live="polite"
            >
              {item.quantity}
            </span>

            <button
              onClick={() => onChangeQty(item.quantity + 1)}
              style={{
                width: 36, height: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#5A5A5A",
                background: "none",
                cursor: "pointer",
                transition: "background-color 150ms ease",
              }}
              className="hover:bg-[#EFEDE9]"
              aria-label="Increase quantity"
            >
              <Plus size={13} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1.25rem" }}>
            {/* Line total — mobile */}
            <span className="md:hidden" style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#1A1A1A" }}>
              {formatPrice(item.price * item.quantity, item.currency)}
            </span>

            {/* Remove */}
            <button
              onClick={onRemove}
              style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "#9A9A9A", padding: "0.25rem" }}
              className="hover:text-[#C04040] transition-colors"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 size={15} />
              <span className="hidden sm:inline" style={{ fontSize: "0.75rem", fontFamily: "var(--font-body)" }}>
                Remove
              </span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

/* ══════════════════════════════════════════
   Summary row
══════════════════════════════════════════ */
function SummaryRow({
  label, value, subLabel, highlight, valueHighlight,
}: {
  label:          string;
  value:          string;
  subLabel?:      string;
  highlight?:     boolean;
  valueHighlight?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
      <div>
        <span style={{ fontSize: "0.875rem", color: highlight ? "#3D7A5F" : "#5A5A5A" }}>
          {label}
        </span>
        {subLabel && (
          <p style={{ fontSize: "0.6875rem", color: "#9A9A9A", marginTop: "0.125rem" }}>
            {subLabel}
          </p>
        )}
      </div>
      <span
        style={{
          fontSize:   "0.875rem",
          fontWeight: 600,
          color:      highlight ? "#3D7A5F" : valueHighlight ? "#3D7A5F" : "#2C2C2C",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {value}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════
   Trust signals
══════════════════════════════════════════ */
function TrustSignals({ compact = false }: { compact?: boolean }) {
  const signals = [
    { Icon: Truck,       label: "Free shipping over €75" },
    { Icon: RotateCcw,   label: "Free 30-day returns" },
    { Icon: ShieldCheck, label: "Secure checkout" },
  ];

  if (compact) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {signals.map(({ Icon, label }) => (
          <div key={label} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.625rem" }}>
            <Icon size={14} color="#C8976A" />
            <span style={{ fontSize: "0.75rem", color: "#5A5A5A" }}>{label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display:             "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap:                 "1rem",
        padding:             "1.25rem",
        backgroundColor:     "#F7F6F4",
        borderRadius:        6,
        border:              "1px solid #D4D4D4",
      }}
    >
      {signals.map(({ Icon, label }) => (
        <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textAlign: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: "9999px", backgroundColor: "#F3E8DE", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={16} color="#C8976A" />
          </div>
          <span style={{ fontSize: "0.6875rem", color: "#5A5A5A", lineHeight: 1.4 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   Empty cart state
══════════════════════════════════════════ */
function EmptyCartPage() {
  return (
    <div className="bg-surface min-h-[70vh] flex items-center justify-center">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem", padding: "2rem", maxWidth: 480 }}>
        {/* Icon */}
        <div
          style={{
            width: 80, height: 80,
            borderRadius: "9999px",
            backgroundColor: "#EFEDE9",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid #D4D4D4",
          }}
        >
          <ShoppingBag size={32} color="#9A9A9A" />
        </div>

        {/* Copy */}
        <div>
          <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "0.75rem" }}>
            Your cart is empty
          </h1>
          <p style={{ fontSize: "1rem", color: "#5A5A5A", lineHeight: 1.65, maxWidth: "38ch", margin: "0 auto" }}>
            Looks like you haven't added anything yet. Explore our collections and find something you'll love.
          </p>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginTop: "0.5rem" }}>
          <Link href="/shop" className="btn-primary">
            Browse Shop
          </Link>
          <Link href="/collections" className="btn-secondary">
            View Collections
          </Link>
        </div>

        {/* Social proof nudge */}
        <p style={{ fontSize: "0.8125rem", color: "#9A9A9A", marginTop: "1rem" }}>
          Free shipping on orders over €75 · Free 30-day returns
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Loading skeleton
══════════════════════════════════════════ */
function CartPageSkeleton() {
  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-raised border-b border-ink-line">
        <div className="container-site py-8 lg:py-10">
          <div className="skeleton h-8 w-48 rounded" />
        </div>
      </div>
      <div className="container-site py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: "1.25rem" }}>
                <div className="skeleton" style={{ height: 120, borderRadius: 6 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div className="skeleton h-4 rounded w-3/4" />
                  <div className="skeleton h-3 rounded w-1/2" />
                  <div className="skeleton h-3 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
          <div className="skeleton" style={{ height: 420, borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
}
