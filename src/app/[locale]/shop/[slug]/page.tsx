import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { getProductBySlug, MOCK_PRODUCTS } from "@/lib/mock/mockProducts";
import { ProductCard } from "@/components/shared/productCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.seo?.title || product.name,
    description: product.seo?.description || product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.relatedProductIds.length > 0
    ? MOCK_PRODUCTS.filter((p) => product.relatedProductIds.includes(p.id))
    : MOCK_PRODUCTS.slice(0, 4); 

  return (
    <div className="container-site py-10 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        
        <div className="relative aspect-[3/4] w-full bg-surface-sunken overflow-hidden rounded-md">
          <Image
            src={product.images[0]?.src || "/placeholder.png"}
            alt={product.images[0]?.altText || product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col">
          <p className="label-caps text-ink-muted mb-2">{product.brand}</p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-xl font-medium">
              {product.price} {product.currency}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-ink-muted line-through">
                {product.compareAtPrice} {product.currency}
              </span>
            )}
          </div>

          <p className="text-ink-soft mb-8 leading-relaxed">
            {product.description}
          </p>

          <button className="btn-primary w-full py-4 mb-8">
            Add to Cart
          </button>

          {product.specs && product.specs.length > 0 && (
            <div className="border-t border-ink-line pt-6 mt-6">
              <h3 className="font-semibold mb-4">Specifications</h3>
              <ul className="space-y-2 text-sm text-ink-soft">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex justify-between border-b border-ink-line pb-2">
                    <span>{spec.label}</span>
                    <span className="text-ink-muted">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-24 border-t border-ink-line pt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">You might also like</h2>
        </div>
        
        <div 
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
          role="list"
        >
          {relatedProducts.map((rp, i) => (
            <div key={rp.id} role="listitem">
              <ProductCard product={rp} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}