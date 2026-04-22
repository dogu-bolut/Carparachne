"use client";

import Image from "next/image";
import Link  from "next/link";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(540px, 88vh, 960px)" }}
      aria-label="Hero — featured collection"
    >
      {/* ── Background image — responsive art direction ── */}
      {/* Mobile crop: portrait (4:5)  /  Desktop crop: wide (16:7) */}
      <picture>
        {/* WebP for modern browsers */}
        <source
          media="(min-width: 768px)"
          srcSet="/images/hero-desktop.webp"
          type="image/webp"
        />
        <source
          media="(max-width: 767px)"
          srcSet="/images/hero-mobile.webp"
          type="image/webp"
        />
        {/* AVIF fallback for cutting-edge browsers */}
        <source
          media="(min-width: 768px)"
          srcSet="/images/hero-desktop.avif"
          type="image/avif"
        />
      </picture>

      {/* Next/Image handles lazy-load, blur-up, and CLS prevention */}
      <Image
        src="/images/hero-desktop.png"
        alt="A styled flat-lay of this season's new arrivals — earthy tones, natural textures"
        fill
        priority                        /* LCP image — never lazy */
        sizes="100vw"
        quality={90}
        className={`
          object-cover object-center
          transition-opacity duration-700
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
        onLoad={() => setLoaded(true)}
      />

      {/* Gradient overlay — ensures text legibility on any image */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/30 to-transparent"
        aria-hidden
      />

      {/* ── Copy & CTAs ── */}
      <div className="relative z-raised h-full flex items-center">
        <div className="container-site">
          <div className="max-w-xl">
            <p
              className="label-caps text-white/70 mb-5 animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              New Season
            </p>
            <h1
              className="text-white text-balance mb-6 animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              Crafted for the<br />
              <em className="font-light italic">deliberate</em> life
            </h1>
            <p
              className="text-white/75 text-lg leading-relaxed mb-10 max-w-sm text-pretty animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              Discover our new collection — materials that age beautifully, designs that endure.
            </p>

            <div
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: "400ms" }}
            >
              <Link href="/shop?sort=newest" className="btn-primary">
                Shop New Arrivals
              </Link>
              <Link href="/collections" className="btn-secondary border-white/40 text-white hover:bg-white/10 hover:border-white">
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
        style={{ animationDelay: "800ms" }}
        aria-hidden
      >
        <span className="label-caps text-white/50 text-[10px]">scroll</span>
        <div className="w-px h-10 bg-white/30 origin-top animate-[scaleY_1.5s_ease-in-out_infinite_alternate]" />
      </div>
    </section>
  );
}
