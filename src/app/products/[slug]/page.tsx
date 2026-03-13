import type { Metadata } from "next";
import { notFound }          from "next/navigation";
import { Suspense }          from "react";
import { ProductGallery }    from "@/components/product/productGallery";
import { ProductInfo }       from "@/components/product/productInfo";
import { ProductAccordion }  from "@/components/product/productAccordion";
import { RelatedProducts }   from "@/components/product/relatedProducts";
import { Breadcrumbs }       from "@/components/shop/sortDropdown";
import { getProductBySlug, getRelatedProducts } from "@/lib/utils/index";

interface Props {
  params: { slug: string };
}

/* Static metadata generation */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};

  const ogImage = product.images[0]?.src ?? "/og-default.png";

  return {
    title:       product.seo.title,
    description: product.seo.description,
    openGraph: {
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.relatedProductIds);

  return (
    <>
      {/* ── Breadcrumbs ── */}
      <div className="container-site pt-6 pb-0">
        <Breadcrumbs
          items={[
            { label: "Shop",        href: "/shop" },
            { label: product.categorySlug, href: `/shop?categories=${product.categorySlug}` },
            { label: product.name,  href: `/products/${product.slug}` },
          ]}
        />
      </div>

      {/* ── Main PDP layout: gallery | info ── */}
      <section
        className="container-site py-8 lg:py-12"
        aria-labelledby="product-title"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 xl:gap-16 items-start">

          {/* Left: Image gallery */}
          <div className="lg:sticky lg:top-24">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product info */}
          <div>
            <ProductInfo product={product} />

            {/* Divider */}
            <hr className="my-8" />

            {/* Accordion: Description, Details, Shipping, Returns */}
            <ProductAccordion product={product} />
          </div>
        </div>
      </section>

      {/* ── Related products ── */}
      {relatedProducts.length > 0 && (
        <section
          className="section-md border-t border-ink-line"
          aria-labelledby="related-heading"
        >
          <div className="container-site">
            <header className="mb-10">
              <p className="label-caps text-ink-muted mb-3">You may also like</p>
              <h2 id="related-heading">Related Products</h2>
            </header>
            <Suspense fallback={null}>
              <RelatedProducts products={relatedProducts} />
            </Suspense>
          </div>
        </section>
      )}
    </>
  );
}
