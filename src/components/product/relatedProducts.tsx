import { ProductCard } from "@/components/shared/productCard";
import type { Product } from "@/lib/types";

export function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
      role="list"
      aria-label="Related products"
    >
      {products.slice(0, 4).map((product, i) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} index={i} />
        </div>
      ))}
    </div>
  );
}
