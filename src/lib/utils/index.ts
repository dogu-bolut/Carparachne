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
  
  // src/lib/utils/cn.ts — class merging utility (mirrors clsx + tailwind-merge)
  import { type ClassValue, clsx } from "clsx";
  import { twMerge } from "tailwind-merge";
  
  export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
  }
  
  // src/lib/utils/productFetchers.ts
  // Stub fetchers — replace with real API/DB calls
  import type { Product } from "@/lib/types";
  
  export async function getProductBySlug(slug: string): Promise<Product | null> {
    // Example: return fetch(`${process.env.API_URL}/products/${slug}`).then(r => r.json())
    return null;
  }
  
  export async function getRelatedProducts(ids: string[]): Promise<Product[]> {
    // Example: return fetch(`${process.env.API_URL}/products?ids=${ids.join(',')}`).then(r => r.json())
    return [];
  }
  
  export async function getProducts(filters: Record<string, string | undefined>): Promise<{
    products: Product[];
    total: number;
  }> {
    return { products: [], total: 0 };
  }
  