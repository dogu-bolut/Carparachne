import Image from "next/image";
import Link  from "next/link";

interface Props {
  /** Override defaults for different seasonal campaigns */
  eyebrow?: string;
  heading?: string;
  body?:    string;
  ctaLabel?:string;
  ctaHref?: string;
  imageSrc?:  string;
  imageAlt?:  string;
}

export function EditorialBanner({
  eyebrow  = "New Collection",
  heading  = "The Spring Linen Edit",
  body     = "Stone, sand, and sage. A palette drawn from the Portuguese coast, in fabrics made to last a lifetime.",
  ctaLabel = "Explore the Edit",
  ctaHref  = "/shop?tags=linen",
  imageSrc = "/images/editorial-banner.jpg",
  imageAlt = "A model wearing the new season linen coat against a whitewashed stone wall",
}: Props) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "clamp(420px, 62vh, 720px)" }}
      aria-label="Editorial feature"
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
      />

      {/* Directional gradient — text sits on the right over a darkened field */}
      <div
        className="absolute inset-0 bg-gradient-to-l from-ink/65 via-ink/25 to-transparent"
        aria-hidden
      />

      {/* Copy block — bottom-right aligned */}
      <div className="relative z-raised h-full flex items-end lg:items-center justify-end">
        <div className="container-site py-12">
          <div className="max-w-sm ml-auto text-right">
            <p
              className="label-caps text-white/60 mb-4 animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              {eyebrow}
            </p>
            <h2
              className="text-white text-4xl lg:text-5xl text-balance leading-tight mb-5 animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              {heading}
            </h2>
            <p
              className="text-white/75 text-base leading-relaxed mb-8 animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              {body}
            </p>
            <div
              className="flex justify-end animate-fade-up"
              style={{ animationDelay: "400ms" }}
            >
              <Link href={ctaHref} className="btn-primary">
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
