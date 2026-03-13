import Image from "next/image";
import Link  from "next/link";

const CATEGORIES = [
  {
    slug: "clothing",     label: "Clothing",
    image: "/images/cat-clothing.jpg",
    alt:   "A neatly folded stack of natural linen shirts",
    span:  "lg:col-span-2 lg:row-span-2",  // Featured large tile
  },
  {
    slug: "accessories",  label: "Accessories",
    image: "/images/cat-accessories.jpg",
    alt:   "Leather goods and ceramic jewellery on a white surface",
    span:  "",
  },
  {
    slug: "home",         label: "Home & Living",
    image: "/images/cat-home.jpg",
    alt:   "Ceramic vases and woven baskets in warm afternoon light",
    span:  "",
  },
  {
    slug: "beauty",       label: "Beauty",
    image: "/images/cat-beauty.jpg",
    alt:   "Natural skincare products in amber glass bottles",
    span:  "",
  },
];

export function CategoryGrid() {
  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 lg:gap-4"
      style={{ gridAutoRows: "minmax(200px, 1fr)" }}
    >
      {CATEGORIES.map(({ slug, label, image, alt, span }, i) => (
        <Link
          key={slug}
          href={`/shop?categories=${slug}`}
          className={`group relative overflow-hidden rounded-lg bg-surface-sunken ${span} animate-fade-up`}
          style={{ animationDelay: `${i * 100}ms`, minHeight: 180 }}
          aria-label={`Shop ${label}`}
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes={span
              ? "(max-width: 1024px) 50vw, 50vw"
              : "(max-width: 1024px) 50vw, 25vw"}
            quality={80}
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent group-hover:from-ink/70 transition-all duration-300" aria-hidden />

          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
            <h3 className="font-display text-white text-xl lg:text-2xl font-light">
              {label}
            </h3>
            <span className="label-caps text-white/70 text-[10px] mt-0.5 block opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              Shop now →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
