import {
  MOCK_PRODUCTS,
  filterAndSortProducts,
} from "@/lib/mock/mockProducts";
import type { Product } from "@/lib/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Simulate an async database/API call for a single product
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  return product ?? null;
}

// Simulate fetching related products by their IDs
export async function getRelatedProducts(ids: string[] | undefined): Promise<Product[]> {
  if (!ids || ids.length === 0) return [];
  return MOCK_PRODUCTS.filter((p) => ids.includes(p.id));
}

export function formatPrice(amount: number, currency = "TRY"): string {
    return new Intl.NumberFormat("en-IE", {
      style:    "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  
  // src/lib/utils/formatDate.ts
  export function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-GB", {
      day:   "numeric",
      month: "long",
      year:  "numeric",
    });
  }
  
  export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
  }
  
  export async function getProducts(filters: Record<string, string | undefined>): Promise<{
    products: Product[];
    total: number;
  }> {
    return filterAndSortProducts(filters);
  }
  