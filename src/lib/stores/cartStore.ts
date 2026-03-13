// src/lib/stores/cartStore.ts
// ─── Zustand cart store — persisted to localStorage ─────────────────────────

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Cart, CartItem, ProductVariantType } from "@/lib/types";

interface CartState extends Cart {
  isOpen: boolean;
  // Actions
  openCart:         () => void;
  closeCart:        () => void;
  toggleCart:       () => void;
  addItem:          (item: Omit<CartItem, "id">) => void;
  removeItem:       (id: string) => void;
  updateQuantity:   (id: string, quantity: number) => void;
  clearCart:        () => void;
}

function computeTotals(items: CartItem[]): Pick<Cart, "subtotal" | "itemCount"> {
  return {
    subtotal:  items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
  };
}

function generateLineItemId(
  productId: string,
  variants: Record<ProductVariantType, string>
): string {
  const variantKey = Object.entries(variants)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
  return `${productId}__${variantKey}`;
}

const EMPTY_CART: Cart = {
  items: [],
  subtotal: 0,
  itemCount: 0,
  updatedAt: new Date(),
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      ...EMPTY_CART,
      isOpen: false,

      openCart:  () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart:() => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (incoming) => {
        const id = generateLineItemId(incoming.productId, incoming.selectedVariants);
        const items = get().items;
        const existing = items.find((i) => i.id === id);

        const next = existing
          ? items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + incoming.quantity } : i
            )
          : [...items, { ...incoming, id }];

        set({ items: next, ...computeTotals(next), updatedAt: new Date() });
      },

      removeItem: (id) => {
        const next = get().items.filter((i) => i.id !== id);
        set({ items: next, ...computeTotals(next), updatedAt: new Date() });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) { get().removeItem(id); return; }
        const next = get().items.map((i) => (i.id === id ? { ...i, quantity } : i));
        set({ items: next, ...computeTotals(next), updatedAt: new Date() });
      },

      clearCart: () => set({ ...EMPTY_CART, updatedAt: new Date() }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items:     state.items,
        subtotal:  state.subtotal,
        itemCount: state.itemCount,
        updatedAt: state.updatedAt,
      }),
    }
  )
);