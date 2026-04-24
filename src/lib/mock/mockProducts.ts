import type { Product } from "@/lib/types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "bs-0", slug: "the-linen-overshirt",
    name: "The Linen Overshirt", brand: "Carparachne",
    description: "A relaxed overshirt cut from Portuguese stonewashed linen. Designed to be worn open over a tee or buttoned up as a light jacket.",
    shortDescription: "Stonewashed Portuguese linen overshirt.",
    price: 129, compareAtPrice: 165, currency: "EUR",
    images: [{ id: "img-0", src: "/images/product-1.jpg", altText: "Linen overshirt in ecru", width: 800, height: 1067 }],
    variants: [], specs: [],
    categorySlug: "clothing",
    tags: ["Organic", "Handcrafted", "New Arrival"],
    badge: "bestseller",
    rating: 5, reviewCount: 20, inStock: true,
    relatedProductIds: [],
    seo: { title: "The Linen Overshirt", description: "" },
  },
  {
    id: "bs-1", slug: "merino-crewneck",
    name: "Merino Crewneck", brand: "Carparachne",
    description: "A classic crewneck in 100% extra-fine merino wool. Relaxed but structured — works equally well over a shirt or on its own.",
    shortDescription: "Extra-fine merino wool crewneck.",
    price: 195, compareAtPrice: 245, currency: "EUR",
    images: [{ id: "img-1", src: "/images/product-2.jpg", altText: "Merino crewneck in warm grey", width: 800, height: 1067 }],
    variants: [], specs: [],
    categorySlug: "clothing",
    tags: ["Sustainable", "Handcrafted"],
    rating: 5, reviewCount: 27, inStock: true,
    relatedProductIds: [],
    seo: { title: "Merino Crewneck", description: "" },
  },
  {
    id: "bs-2", slug: "canvas-tote",
    name: "Canvas Tote", brand: "Carparachne",
    description: "Heavy-duty waxed canvas tote with leather handles and a linen lining. Gets better with every use.",
    shortDescription: "Waxed canvas tote with leather handles.",
    price: 75, compareAtPrice: 95, currency: "EUR",
    images: [{ id: "img-2", src: "/images/product-3.jpg", altText: "Natural canvas tote bag", width: 800, height: 1067 }],
    variants: [], specs: [],
    categorySlug: "accessories",
    tags: ["Handcrafted", "Sustainable"],
    rating: 4, reviewCount: 34, inStock: true,
    relatedProductIds: [],
    seo: { title: "Canvas Tote", description: "" },
  },
  {
    id: "bs-3", slug: "leather-card-holder",
    name: "Leather Card Holder", brand: "Carparachne",
    description: "Vegetable-tanned full-grain leather card holder. Holds up to 6 cards. Develops a unique patina over time.",
    shortDescription: "Full-grain vegetable-tanned leather.",
    price: 85, compareAtPrice: 85, currency: "EUR",
    images: [{ id: "img-3", src: "/images/product-4.jpg", altText: "Tan leather card holder", width: 800, height: 1067 }],
    variants: [], specs: [],
    categorySlug: "accessories",
    tags: ["Handcrafted", "Gift Idea", "New Arrival"],
    badge: "new",
    rating: 5, reviewCount: 48, inStock: true,
    relatedProductIds: [],
    seo: { title: "Leather Card Holder", description: "" },
  },
  {
    id: "bs-4", slug: "ceramic-mug-set",
    name: "Ceramic Mug Set", brand: "Carparachne",
    description: "A pair of wheel-thrown stoneware mugs glazed with natural ash glazes. Each piece is unique. Dishwasher and microwave safe.",
    shortDescription: "Wheel-thrown stoneware, ash glaze. Set of 2.",
    price: 110, compareAtPrice: 110, currency: "EUR",
    images: [{ id: "img-4", src: "/images/product-5.jpg", altText: "Two stoneware mugs on a stone surface", width: 800, height: 1067 }],
    variants: [], specs: [],
    categorySlug: "home",
    tags: ["Handcrafted", "Gift Idea"],
    rating: 4, reviewCount: 55, inStock: true,
    relatedProductIds: [],
    seo: { title: "Ceramic Mug Set", description: "" },
  },
  {
    id: "bs-5", slug: "silk-scarf",
    name: "Silk Scarf", brand: "Carparachne",
    description: "Hand-printed on 100% mulberry silk. A 90×90 cm square with a hand-rolled edge. Each colourway is limited to 50 pieces.",
    shortDescription: "100% mulberry silk, hand-rolled edge.",
    price: 145, compareAtPrice: 145, currency: "EUR",
    images: [{ id: "img-5", src: "/images/product-6.jpg", altText: "Silk scarf with botanical print", width: 800, height: 1067 }],
    variants: [], specs: [],
    categorySlug: "accessories",
    tags: ["Limited Edition", "Gift Idea"],
    rating: 4, reviewCount: 62, inStock: false, // out of stock
    relatedProductIds: [],
    seo: { title: "Silk Scarf", description: "" },
  },
  {
    id: "bs-6", slug: "wool-blanket",
    name: "Wool Blanket", brand: "Carparachne",
    description: "Woven from undyed British Shetland wool on a traditional dobby loom. Heavy, warm, and completely natural.",
    shortDescription: "Undyed Shetland wool, dobby loom woven.",
    price: 220, compareAtPrice: 280, currency: "EUR",
    images: [{ id: "img-6", src: "/images/product-7.jpg", altText: "Natural wool blanket draped over a chair", width: 800, height: 1067 }],
    variants: [], specs: [],
    categorySlug: "home",
    tags: ["Organic", "Sustainable"],
    rating: 5, reviewCount: 69, inStock: true,
    relatedProductIds: [],
    seo: { title: "Wool Blanket", description: "" },
  },
  {
    id: "bs-7", slug: "bamboo-candle",
    name: "Bamboo Candle", brand: "Carparachne",
    description: "Hand-poured soy wax candle in a reusable ceramic vessel. Scented with bamboo, white musk, and a hint of cedar.",
    shortDescription: "Soy wax in reusable ceramic, 40 hr burn.",
    price: 55, compareAtPrice: 55, currency: "EUR",
    images: [{ id: "img-7", src: "/images/product-8.jpg", altText: "White ceramic candle vessel", width: 800, height: 1067 }],
    variants: [], specs: [],
    categorySlug: "home",
    tags: ["Gift Idea", "New Arrival", "Sustainable"],
    badge: "new",
    rating: 4, reviewCount: 76, inStock: true,
    relatedProductIds: [],
    seo: { title: "Bamboo Candle", description: "" },
  },
];

/* ── Filter + sort helper (mirrors what getProducts() would do server-side) ── */
export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "best-rating"
  | "most-reviewed";

export interface GetProductsArgs {
  categories?: string;
  minPrice?:   string;
  maxPrice?:   string;
  tags?:       string;
  inStock?:    string;
  sort?:       string;
  page?:       string;
  pageSize?:   string;
}

export function filterAndSortProducts(
  args: GetProductsArgs,
  source: Product[] = MOCK_PRODUCTS,
): { products: Product[]; total: number } {
  const {
    categories = "",
    minPrice   = "0",
    maxPrice   = "99999",
    tags       = "",
    inStock    = "",
    sort       = "featured",
    page       = "1",
    pageSize   = "20",
  } = args;

  const activeCats  = categories.split(",").filter(Boolean);
  const activeTags  = tags.split(",").filter(Boolean);
  const min         = Number(minPrice);
  const max         = Number(maxPrice);
  const inStockOnly = inStock === "true";

  let results = source.filter((p) => {
    if (activeCats.length && !activeCats.includes(p.categorySlug)) return false;
    if (p.price < min || p.price > max)                              return false;
    if (activeTags.length && !activeTags.some((t) => p.tags.includes(t))) return false;
    if (inStockOnly && !p.inStock)                                   return false;
    return true;
  });

  // Sort
  results = [...results].sort((a, b) => {
    switch (sort as SortOption) {
      case "price-asc":     return a.price - b.price;
      case "price-desc":    return b.price - a.price;
      case "best-rating":   return (b.rating ?? 0) - (a.rating ?? 0);
      case "most-reviewed": return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      case "newest":        return Number(b.id.split("-")[1]) - Number(a.id.split("-")[1]);
      default:              return 0; // featured — keep insertion order
    }
  });

  const total    = results.length;
  const pageNum  = Math.max(1, Number(page));
  const size     = Math.max(1, Number(pageSize));
  const products = results.slice((pageNum - 1) * size, pageNum * size);

  return { products, total };
}