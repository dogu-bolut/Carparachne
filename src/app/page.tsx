import type { Metadata } from "next";
import { HeroSection }        from "@/components/home/heroSection";
import { CategoryGrid }       from "@/components/home/categoryGrid";
import { BestSellersCarousel } from "@/components/home/bestSellersCarousel";
import { ValueProposition }   from "@/components/home/valueProposition";
import { EditorialBanner }    from "@/components/home/editorialBanner";
import { BlogTeaser }         from "@/components/home/blogTeaser";

export const metadata: Metadata = {
  title: "Atelier — Refined Commerce",
  description:
    "Thoughtfully curated products for a considered life. Shop new arrivals, best sellers, and editorial collections.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Full-viewport hero with CTA */}
      <HeroSection />

      {/* 2. Category tiles grid */}
      <section className="section-md" aria-labelledby="categories-heading">
        <div className="container-site">
          <header className="mb-10 lg:mb-14 text-center">
            <p className="label-caps text-ink-muted mb-3">Explore</p>
            <h2 id="categories-heading">Shop by Category</h2>
          </header>
          <CategoryGrid />
        </div>
      </section>

      {/* 3. Best-selling products carousel */}
      <section
        className="section-md bg-surface-sunken"
        aria-labelledby="bestsellers-heading"
      >
        <div className="container-site">
          <header className="mb-10 lg:mb-14 flex items-end justify-between">
            <div>
              <p className="label-caps text-ink-muted mb-3">Curated for you</p>
              <h2 id="bestsellers-heading">Best Sellers</h2>
            </div>
            <a
              href="/shop?sort=bestseller"
              className="label-caps text-ink-muted hover:text-ink transition-colors hidden sm:flex items-center gap-2"
            >
              View all →
            </a>
          </header>
          <BestSellersCarousel />
        </div>
      </section>

      {/* 4. Value proposition (free shipping, returns, etc.) */}
      <ValueProposition />

      {/* 5. Full-width editorial / lifestyle banner */}
      <EditorialBanner />

      {/* 6. Blog teaser (3 recent posts) */}
      <section className="section-md" aria-labelledby="journal-heading">
        <div className="container-site">
          <header className="mb-10 lg:mb-14 text-center">
            <p className="label-caps text-ink-muted mb-3">Stories</p>
            <h2 id="journal-heading">From the Journal</h2>
          </header>
          <BlogTeaser />
        </div>
      </section>
    </>
  );
}