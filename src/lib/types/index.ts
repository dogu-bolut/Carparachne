// ============================================================
// PRODUCT
// ============================================================
export interface ProductImage {
    id: string;
    src: string;
    altText: string;
    width: number;
    height: number;
    isDefault?: boolean;
  }
  
  export type ProductVariantType = "color" | "size" | "material" | "style";
  
  export interface VariantOption {
    label: string;
    value: string;
    inStock: boolean;
    /** hex or tailwind color class for color swatches */
    hex?: string;
  }
  
  export interface ProductVariant {
    id: string;
    type: ProductVariantType;
    name: string;
    options: VariantOption[];
  }
  
  export interface ProductSpec {
    label: string;
    value: string;
  }
  
  export type Review = {
    id: string;
    author: string;
    rating: number;
    date: string;
    text: string;
  };

  export type BadgeType = "new" | "sale" | "bestseller" | "low-stock" | "sold-out";
  
  export interface Product {
    id: string;
    slug: string;
    name: string;
    brand?: string;
    description: string;
    shortDescription?: string;
    price: number;
    compareAtPrice?: number;       // Original price before discount
    currency: string;              // ISO 4217 e.g. "USD"
    images: ProductImage[];
    variants: ProductVariant[];
    specs: ProductSpec[];
    categorySlug: string;
    tags: string[];
    badge?: BadgeType;
    rating?: number;                // 0–5
    reviewCount?: number;
    reviews?: Review[];
    inStock: boolean;
    relatedProductIds: string[];
    seo: {
      title: string;
      description: string;
    };
  }
  
  // ============================================================
  // CATEGORY
  // ============================================================
  export interface Category {
    id: string;
    slug: string;
    name: string;
    description?: string;
    image: ProductImage;
    productCount: number;
    parentSlug?: string;
  }
  
  // ============================================================
  // CART
  // ============================================================
  export interface CartItem {
    id: string;                    // Unique line-item id
    productId: string;
    slug: string;
    name: string;
    image: ProductImage;
    price: number;
    currency: string;
    quantity: number;
    selectedVariants: Record<ProductVariantType, string>;
  }
  
  export interface Cart {
    items: CartItem[];
    subtotal: number;
    itemCount: number;
    updatedAt: Date;
  }
  
  // ============================================================
  // FILTERS & SORTING (Shopping Page)
  // ============================================================
  export type SortOption =
    | "featured"
    | "newest"
    | "price-asc"
    | "price-desc"
    | "best-rating"
    | "most-reviewed";
  
  export interface PriceRange {
    min: number;
    max: number;
  }
  
  export interface ActiveFilters {
    categories: string[];
    priceRange: PriceRange;
    tags: string[];
    inStockOnly: boolean;
    sortBy: SortOption;
  }
  
  // ============================================================
  // BLOG
  // ============================================================
  export interface Author {
    id: string;
    name: string;
    bio?: string;
    avatar: ProductImage;
    role?: string;
  }
  
  export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;               // MDX or HTML string
    coverImage: ProductImage;
    author: Author;
    category: string;
    tags: string[];
    publishedAt: string;           // ISO 8601
    readingTime: number;           // minutes
    seo: {
      title: string;
      description: string;
      ogImage?: string;
    };
  }
  
  // ============================================================
  // NAVIGATION
  // ============================================================
  export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
    badge?: string;
  }
  
  // ============================================================
  // TEAM (About Page)
  // ============================================================
  export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: ProductImage;
    socials?: {
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    };
  }
  
  // ============================================================
  // CONTACT FORM
  // ============================================================
  export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    orderNumber?: string;
  }
  
  // ============================================================
  // FAQ
  // ============================================================
  export interface FaqItem {
    id: string;
    question: string;
    answer: string;                // HTML or plain text
    category: string;
  }
  
  // ============================================================
  // TOAST / NOTIFICATIONS
  // ============================================================
  export type ToastType = "success" | "error" | "info" | "warning";
  
  export interface ToastMessage {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;             // ms; default 4000
  }
  
  // ============================================================
  // API RESPONSE WRAPPERS
  // ============================================================
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
  }
  
  export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, string>;
  }