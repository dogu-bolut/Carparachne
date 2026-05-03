import type { Product } from "@/lib/types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "bs-0",
    slug: "the-linen-overshirt",
    name: "The Linen Overshirt",
    brand: "Carparachne",
    description:
      "A relaxed overshirt cut from Portuguese stonewashed linen. Designed to be worn open over a tee or buttoned up as a light jacket.",
    shortDescription: "Stonewashed Portuguese linen overshirt.",
    price: 129,
    compareAtPrice: 165,
    currency: "EUR",
    images: [
      {
        id: "the-linen-overshirt-front",
        src: "/images/linen-overshirt-front.jpg",
        altText: "The Linen Overshirt - Front View",
        width: 800,
        height: 1067,
      },
      {
        id: "the-linen-overshirt-back",
        src: "/images/linen-overshirt-back.jpg",
        altText: "The Linen Overshirt - Back View",
        width: 800,
        height: 1067,
      },
      {
        id: "the-linen-overshirt-detail",
        src: "/images/linen-overshirt-detail.jpg",
        altText: "The Linen Overshirt - Fabric Texture Detail",
        width: 800,
        height: 1067,
      },
      {
        id: "the-linen-overshirt-model",
        src: "/images/linen-overshirt-model.jpg",
        altText: "The Linen Overshirt - On Model",
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: "v-size",
        type: "size",
        name: "Size",
        options: [
          { label: "S", value: "S", inStock: true },
          { label: "M", value: "M", inStock: true },
          { label: "L", value: "L", inStock: false },
          { label: "XL", value: "XL", inStock: true },
        ],
      },
      {
        id: "v-fit",
        type: "style",
        name: "Fit",
        options: [
          { label: "Regular", value: "regular", inStock: true },
          { label: "Relaxed", value: "relaxed", inStock: true },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "100% Portuguese Linen" },
      { label: "Weight", value: "150 GSM" },
      { label: "Care", value: "Machine wash cold, lay flat to dry" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    categorySlug: "clothing",
    tags: ["Organic", "Handcrafted", "New Arrival"],
    badge: "bestseller",
    rating: 5,
    reviewCount: 2,
    inStock: true,
    relatedProductIds: ["bs-1", "bs-2", "bs-3", "bs-6"],
    seo: {
      title: "The Linen Overshirt | Carparachne",
      description: "Portuguese stonewashed linen overshirt.",
    },
  },
  {
    id: "bs-1",
    slug: "merino-crewneck",
    name: "Merino Crewneck",
    brand: "Carparachne",
    description:
      "A classic crewneck in 100% extra-fine merino wool. Relaxed but structured — works equally well over a shirt or on its own.",
    shortDescription: "Extra-fine merino wool crewneck.",
    price: 195,
    compareAtPrice: 245,
    currency: "EUR",
    images: [
      {
        id: "merino-crewneck-flat",
        src: "/images/merino-crewneck.jpg",
        altText: "Merino Crewneck - Flat Lay View",
        width: 800,
        height: 1067,
      },
      {
        id: "merino-crewneck-cuff",
        src: "/images/merino-crewneck.jpg",
        altText: "Merino Crewneck - Ribbed Cuff Detail",
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: "v-size",
        type: "size",
        name: "Size",
        options: [
          { label: "S", value: "S", inStock: true },
          { label: "M", value: "M", inStock: true },
          { label: "L", value: "L", inStock: true },
          { label: "XL", value: "XL", inStock: false },
        ],
      },
      {
        id: "v-color",
        type: "color",
        name: "Color",
        options: [
          { label: "Warm Grey", value: "warm-grey", inStock: true },
          { label: "Navy Blue", value: "navy-blue", inStock: true },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "100% Extra-fine Merino Wool" },
      { label: "Gauge", value: "12 Gauge Knit" },
      { label: "Care", value: "Hand wash cold, dry flat" },
      { label: "Origin", value: "Knitted in Italy" },
    ],
    categorySlug: "clothing",
    tags: ["Sustainable", "Handcrafted"],
    rating: 4.8,
    reviewCount: 27,
    inStock: true,
    relatedProductIds: ["bs-0", "bs-6"],
    seo: {
      title: "Merino Crewneck | Carparachne",
      description: "Italian knit merino wool crewneck.",
    },
  },
  {
    id: "bs-2",
    slug: "canvas-tote",
    name: "Canvas Tote",
    brand: "Carparachne",
    description:
      "Heavy-duty waxed canvas tote with leather handles and a linen lining. Gets better with every use.",
    shortDescription: "Waxed canvas tote with leather handles.",
    price: 75,
    compareAtPrice: 95,
    currency: "EUR",
    images: [
      {
        id: "canvas-tote-front",
        src: "/images/canvas-tote.jpg",
        altText: "Canvas Tote - Natural Finish Front View",
        width: 800,
        height: 1067,
      },
      {
        id: "canvas-tote-olive",
        src: "/images/canvas-tote.jpg",
        altText: "Canvas Tote - Olive Variation View",
        width: 800,
        height: 1067,
      },
      {
        id: "canvas-tote-inside",
        src: "/images/canvas-tote.jpg",
        altText: "Canvas Tote - Interior Lining Detail",
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: "v-color",
        type: "color",
        name: "Color",
        options: [
          { label: "Natural", value: "natural", inStock: true },
          { label: "Olive", value: "olive", inStock: true },
        ],
      },
    ],
    specs: [
      { label: "Exterior", value: "18oz Waxed Cotton Canvas" },
      { label: "Lining", value: "100% Linen" },
      { label: "Straps", value: "Vegetable-tanned Leather" },
      { label: "Dimensions", value: "40cm x 35cm x 15cm" },
    ],
    categorySlug: "accessories",
    tags: ["Handcrafted", "Sustainable"],
    rating: 4.5,
    reviewCount: 34,
    inStock: true,
    relatedProductIds: ["bs-3"],
    seo: {
      title: "Canvas Tote Bag | Carparachne",
      description: "Heavy-duty waxed canvas and leather tote.",
    },
  },
  {
    id: "bs-3",
    slug: "leather-card-holder",
    name: "Leather Card Holder",
    brand: "Carparachne",
    description:
      "Vegetable-tanned full-grain leather card holder. Holds up to 6 cards. Develops a unique patina over time.",
    shortDescription: "Full-grain vegetable-tanned leather.",
    price: 85,
    compareAtPrice: 85,
    currency: "EUR",
    images: [
      {
        id: "leather-card-holder-front",
        src: "/images/leather-card-holder.jpg",
        altText: "Leather Card Holder - Tan Front View",
        width: 800,
        height: 1067,
      },
      {
        id: "leather-card-holder-detail",
        src: "/images/leather-card-holder.jpg",
        altText: "Leather Card Holder - Filled Slots Detail",
        width: 800,
        height: 1067,
      },
      {
        id: "leather-card-holder-black",
        src: "/images/leather-card-holder.jpg",
        altText: "Leather Card Holder - Black Variation View",
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: "v-color",
        type: "color",
        name: "Color",
        options: [
          { label: "Tan", value: "tan", inStock: true },
          { label: "Black", value: "black", inStock: false },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "Full-grain Italian Leather" },
      { label: "Thread", value: "Waxed Linen" },
      { label: "Capacity", value: "Up to 6 cards + folded bills" },
      { label: "Dimensions", value: "10cm x 7cm" },
    ],
    categorySlug: "accessories",
    tags: ["Handcrafted", "Gift Idea", "New Arrival"],
    badge: "new",
    rating: 5,
    reviewCount: 48,
    inStock: true,
    relatedProductIds: ["bs-2"],
    seo: {
      title: "Leather Card Holder | Carparachne",
      description: "Minimalist Italian leather card holder.",
    },
  },
  {
    id: "bs-4",
    slug: "ceramic-mug-set",
    name: "Ceramic Mug Set",
    brand: "Carparachne",
    description:
      "A pair of wheel-thrown stoneware mugs glazed with natural ash glazes. Each piece is unique. Dishwasher and microwave safe.",
    shortDescription: "Wheel-thrown stoneware, ash glaze. Set of 2.",
    price: 110,
    compareAtPrice: 110,
    currency: "EUR",
    images: [
      {
        id: "ceramic-mug-set-pair",
        src: "/images/ceramic-mug-set.jpg",
        altText: "Ceramic Mug Set - Pair on Stone Surface",
        width: 800,
        height: 1067,
      },
      {
        id: "ceramic-mug-set-detail",
        src: "/images/ceramic-mug-set.jpg",
        altText: "Ceramic Mug Set - Ash Glaze Texture Detail",
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: "v-glaze",
        type: "color",
        name: "Glaze Finish",
        options: [
          { label: "Speckled Ash", value: "speckled-ash", inStock: true },
          { label: "Matte Charcoal", value: "matte-charcoal", inStock: true },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "High-fired Stoneware" },
      { label: "Care", value: "Dishwasher and microwave safe" },
      { label: "Volume", value: "300ml per mug" },
      { label: "Origin", value: "Handmade locally" },
    ],
    categorySlug: "home-and-living",
    tags: ["Handcrafted", "Gift Idea"],
    rating: 4.2,
    reviewCount: 55,
    inStock: true,
    relatedProductIds: ["bs-7"],
    seo: {
      title: "Ceramic Mug Set | Carparachne",
      description: "Handmade wheel-thrown stoneware mugs.",
    },
  },
  {
    id: "bs-5",
    slug: "silk-scarf",
    name: "Silk Scarf",
    brand: "Carparachne",
    description:
      "Hand-printed on 100% mulberry silk. A 90×90 cm square with a hand-rolled edge. Each colourway is limited to 50 pieces.",
    shortDescription: "100% mulberry silk, hand-rolled edge.",
    price: 145,
    compareAtPrice: 145,
    currency: "EUR",
    images: [
      {
        id: "silk-scarf-botanical",
        src: "/images/silk-scarf.jpg",
        altText: "Silk Scarf - Botanical Print View",
        width: 800,
        height: 1067,
      },
      {
        id: "silk-scarf-edge",
        src: "/images/silk-scarf.jpg",
        altText: "Silk Scarf - Hand-rolled Edge Detail",
        width: 800,
        height: 1067,
      },
      {
        id: "silk-scarf-geometric",
        src: "/images/silk-scarf.jpg",
        altText: "Silk Scarf - Geometric Print View",
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: "v-pattern",
        type: "style",
        name: "Pattern",
        options: [
          { label: "Botanical", value: "botanical", inStock: false },
          { label: "Geometric", value: "geometric", inStock: false },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "100% Mulberry Silk" },
      { label: "Weave", value: "Silk Twill (14 momme)" },
      { label: "Care", value: "Dry clean only" },
      { label: "Dimensions", value: "90cm x 90cm" },
    ],
    categorySlug: "accessories",
    tags: ["Limited Edition", "Gift Idea"],
    rating: 4.9,
    reviewCount: 62,
    inStock: false,
    relatedProductIds: ["bs-3"],
    seo: {
      title: "Printed Silk Scarf | Carparachne",
      description: "Limited edition 100% mulberry silk scarf.",
    },
  },
  {
    id: "bs-6",
    slug: "wool-blanket",
    name: "Wool Blanket",
    brand: "Carparachne",
    description:
      "Woven from undyed British Shetland wool on a traditional dobby loom. Heavy, warm, and completely natural.",
    shortDescription: "Undyed Shetland wool, dobby loom woven.",
    price: 220,
    compareAtPrice: 280,
    currency: "EUR",
    images: [
      {
        id: "wool-blanket-draped",
        src: "/images/wool-blanket.jpg",
        altText: "Wool Blanket - Draped on Chair View",
        width: 800,
        height: 1067,
      },
      {
        id: "wool-blanket-detail",
        src: "/images/wool-blanket.jpg",
        altText: "Wool Blanket - Dobby Loom Weave Detail",
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: "v-color",
        type: "color",
        name: "Color",
        options: [
          { label: "Natural Grey", value: "natural-grey", inStock: true },
          { label: "Oatmeal", value: "oatmeal", inStock: true },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "100% British Shetland Wool" },
      { label: "Weight", value: "2.1 kg" },
      { label: "Care", value: "Dry clean or hand wash cold" },
      { label: "Dimensions", value: "150cm x 200cm" },
    ],
    categorySlug: "home-and-living",
    tags: ["Organic", "Sustainable"],
    rating: 5,
    reviewCount: 69,
    inStock: true,
    relatedProductIds: ["bs-4", "bs-7"],
    seo: {
      title: "Heavy Wool Blanket | Carparachne",
      description: "Undyed British Shetland wool blanket.",
    },
  },
  {
    id: "bs-7",
    slug: "bamboo-candle",
    name: "Bamboo Candle",
    brand: "Carparachne",
    description:
      "Hand-poured soy wax candle in a reusable ceramic vessel. Scented with bamboo, white musk, and a hint of cedar.",
    shortDescription: "Soy wax in reusable ceramic, 40 hr burn.",
    price: 55,
    compareAtPrice: 55,
    currency: "EUR",
    images: [
      {
        id: "bamboo-candle-unlit",
        src: "/images/bamboo-candle.jpg",
        altText: "Bamboo Candle - Ceramic Vessel View",
        width: 800,
        height: 1067,
      },
      {
        id: "bamboo-candle-lit",
        src: "/images/bamboo-candle.jpg",
        altText: "Bamboo Candle - Lit Ambience View",
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: "v-size",
        type: "size",
        name: "Size",
        options: [
          { label: "Standard (200g)", value: "standard", inStock: true },
          { label: "Large (400g)", value: "large", inStock: true },
        ],
      },
    ],
    specs: [
      { label: "Wax", value: "100% Natural Soy" },
      { label: "Wick", value: "Lead-free Cotton" },
      { label: "Burn Time", value: "Approx. 40 hours" },
      { label: "Vessel", value: "Reusable Glazed Ceramic" },
    ],
    categorySlug: "home-and-living",
    tags: ["Gift Idea", "New Arrival", "Sustainable"],
    badge: "new",
    rating: 4.7,
    reviewCount: 76,
    inStock: true,
    relatedProductIds: ["bs-4", "bs-6"],
    seo: {
      title: "Bamboo Scented Candle | Carparachne",
      description: "Hand-poured natural soy wax candle.",
    },
  },
  {
    id: "bs-8",
    slug: "automatic-field-watch",
    name: "Automatic Field Watch",
    brand: "Carparachne",
    description:
      "A highly legible, automatic mechanical watch stripped of unnecessary dials and indicators. Features a clean, elegant face with a durable brushed steel case and canvas strap.",
    shortDescription: "Minimalist mechanical field watch.",
    price: 320,
    compareAtPrice: 380,
    currency: "EUR",
    images: [
      {
        id: "automatic-field-watch-front",
        src: "/images/cat-accessories.jpg",
        altText: "Automatic Field Watch - Minimalist Dial View",
        width: 800,
        height: 1067,
      },
      {
        id: "automatic-field-watch-strap",
        src: "/images/cat-accessories.jpg",
        altText: "Automatic Field Watch - Canvas Strap Detail",
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: "v-dial",
        type: "color",
        name: "Dial Color",
        options: [
          { label: "Matte Black", value: "matte-black", inStock: true },
          { label: "Desert Sand", value: "desert-sand", inStock: false },
        ],
      },
    ],
    specs: [
      { label: "Movement", value: "Automatic Mechanical" },
      { label: "Case", value: "316L Brushed Stainless Steel" },
      { label: "Crystal", value: "Sapphire Anti-Reflective" },
      { label: "Water Resistance", value: "10 ATM" },
    ],
    categorySlug: "accessories",
    tags: ["Handcrafted", "Iconic", "New Arrival"],
    rating: 4.9,
    reviewCount: 12,
    inStock: true,
    relatedProductIds: ["bs-3", "bs-2"],
    seo: {
      title: "Automatic Field Watch | Carparachne",
      description: "Clean and legible automatic mechanical watch.",
    },
  },
  {
    id: "bs-9",
    slug: "texture-control-clay",
    name: "Texture & Control Clay",
    brand: "Carparachne",
    description:
      "A natural styling clay providing a flexible hold with a slightly damp finish. Perfect for controlling volume and taming frizz in wavy hair without the stiffness of traditional gels.",
    shortDescription: "Flexible hold clay for textured hair.",
    price: 28,
    compareAtPrice: 28,
    currency: "EUR",
    images: [
      {
        id: "texture-control-clay-jar",
        src: "/images/cat-beauty.jpg",
        altText: "Texture & Control Clay - Product Jar View",
        width: 800,
        height: 1067,
      },
      {
        id: "texture-control-clay-texture",
        src: "/images/cat-beauty.jpg",
        altText: "Texture & Control Clay - Texture Detail",
        width: 800,
        height: 1067,
      },
    ],
    variants: [],
    specs: [
      { label: "Hold", value: "Medium / Flexible" },
      { label: "Finish", value: "Natural / Low Shine" },
      { label: "Size", value: "100ml / 3.4oz" },
      { label: "Key Ingredients", value: "Kaolin Clay, Beeswax, Argan Oil" },
    ],
    categorySlug: "grooming",
    tags: ["Organic", "New Arrival"],
    rating: 4.6,
    reviewCount: 41,
    inStock: true,
    relatedProductIds: [],
    seo: {
      title: "Texture & Control Hair Clay | Carparachne",
      description: "Natural styling clay for wavy and textured hair.",
    },
  },
];

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "best-rating"
  | "most-reviewed";

export interface GetProductsArgs {
  categories?: string;
  minPrice?: string;
  maxPrice?: string;
  tags?: string;
  inStock?: string;
  sort?: string;
  page?: string;
  pageSize?: string;
}

export function filterAndSortProducts(
  args: GetProductsArgs,
  source: Product[] = MOCK_PRODUCTS,
): { products: Product[]; total: number } {
  const {
    categories = "",
    minPrice = "0",
    maxPrice = "99999",
    tags = "",
    inStock = "",
    sort = "featured",
    page = "1",
    pageSize = "20",
  } = args;

  const activeCats = categories.split(",").filter(Boolean);
  const activeTags = tags.split(",").filter(Boolean);
  const min = Number(minPrice);
  const max = Number(maxPrice);
  const inStockOnly = inStock === "true";

  let results = source.filter((p) => {
    if (activeCats.length && !activeCats.includes(p.categorySlug)) return false;
    if (p.price < min || p.price > max) return false;
    if (activeTags.length && !activeTags.some((t) => p.tags.includes(t)))
      return false;
    if (inStockOnly && !p.inStock) return false;
    return true;
  });

  results = [...results].sort((a, b) => {
    switch (sort as SortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "best-rating":
        return (b.rating ?? 0) - (a.rating ?? 0);
      case "most-reviewed":
        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      case "newest":
        return Number(b.id.split("-")[1]) - Number(a.id.split("-")[1]);
      default:
        return 0;
    }
  });

  const total = results.length;
  const pageNum = Math.max(1, Number(page));
  const size = Math.max(1, Number(pageSize));
  const products = results.slice((pageNum - 1) * size, pageNum * size);

  return { products, total };
}

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export interface CategoryOption {
  slug: string;
  label: string;
  count: number;
}

export interface FilterOptions {
  categories: CategoryOption[];
  tags: string[];
}

function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(/\bAnd\b/g, "&");
}

export function getFilterOptions(
  source: Product[] = MOCK_PRODUCTS,
): FilterOptions {
  const categoryCount = new Map<string, number>();
  const tagCount = new Map<string, number>();

  for (const product of source) {
    categoryCount.set(
      product.categorySlug,
      (categoryCount.get(product.categorySlug) ?? 0) + 1,
    );

    for (const tag of product.tags) {
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
    }
  }

  const categories: CategoryOption[] = Array.from(categoryCount.entries()).map(
    ([slug, count]) => ({ slug, label: slugToLabel(slug), count }),
  );

  const tags = Array.from(tagCount.entries())
    .sort((a, b) => {
      const countA = a[1];
      const countB = b[1];

      if (countB !== countA) {
        return countB - countA;
      }
      return a[0].localeCompare(b[0]);
    })
    .slice(0, 10)
    .map(([tag]) => tag);

  return { categories, tags };
}
