import { Truck, RotateCcw, Leaf, BadgeCheck } from "lucide-react";

const VALUES = [
  { Icon: Truck,       title: "Free Shipping",         body: "On all orders over €75 worldwide." },
  { Icon: RotateCcw,   title: "30-Day Returns",        body: "Free returns, no questions asked." },
  { Icon: Leaf,        title: "Sustainably Made",      body: "GOTS-certified organic materials." },
  { Icon: BadgeCheck,  title: "Lifetime Quality",      body: "We stand behind every product we make." },
];

export function ValueProposition() {
  return (
    <section
      className="bg-surface-raised border-y border-ink-line"
      aria-label="Why Atelier"
    >
      <div className="container-site py-10 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {VALUES.map(({ Icon, title, body }, i) => (
            <div key={title} className="flex flex-col items-center text-center gap-3 animate-fade-up"
                 style={{ animationDelay: `${i * 75}ms` }}>
              <div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center">
                <Icon size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="font-sans text-sm font-semibold text-ink-soft mb-1">{title}</h3>
                <p className="text-xs text-ink-ghost leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── src/components/home/EditorialBanner.tsx ─────────────────────────────
import Image from "next/image";
import Link  from "next/link";

export function EditorialBanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(400px, 60vh, 700px)" }}
      aria-label="Editorial feature"
    >
      <Image
        src="/images/editorial-banner.jpg"
        alt="A model wearing the new season linen coat against a whitewashed stone wall"
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-ink/65 via-ink/30 to-transparent" aria-hidden />

      <div className="relative z-raised h-full flex items-center justify-end">
        <div className="container-site">
          <div className="max-w-sm ml-auto text-right">
            <p className="label-caps text-white/60 mb-4">New Collection</p>
            <h2 className="text-white text-4xl lg:text-5xl text-balance mb-6">
              The Spring Linen Edit
            </h2>
            <p className="text-white/75 text-base leading-relaxed mb-8">
              Stone, sand, and sage. A palette drawn from the Portuguese coast, in fabrics made to last a lifetime.
            </p>
            <Link href="/shop?tags=linen" className="btn-primary inline-flex">
              Explore the Edit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── src/components/home/CategoryGrid.tsx ────────────────────────────────
// ─── src/components/home/BestSellersCarousel.tsx — see below ─────────────
