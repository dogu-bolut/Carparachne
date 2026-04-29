"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { ProductImage } from "@/lib/types";

interface Props {
  images:      ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed,      setZoomed]      = useState(false);
  const [zoomOrigin,  setZoomOrigin]  = useState({ x: 50, y: 50 });

  if (!images.length) {
    return (
      <div
        className="aspect-product rounded-md bg-surface-sunken"
        aria-label={`${productName} image unavailable`}
      />
    );
  }

  const active = images[activeIndex]!;

  function prev() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setActiveIndex((i) => (i + 1) % images.length);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    setZoomOrigin({ x, y });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft")  prev();
    if (e.key === "ArrowRight") next();
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 w-full max-w-[550px] mx-auto">

      <div
        className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[620px] no-scrollbar"
        role="tablist"
        aria-label="Product images"
      >
        {images.map((img, i) => (
          <button
            key={img.id}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Image ${i + 1}: ${img.altText}`}
            onClick={() => setActiveIndex(i)}
            className={`
              relative flex-shrink-0 w-16 h-20 lg:w-[72px] lg:h-[90px] rounded overflow-hidden border-2 transition-all duration-150
              ${i === activeIndex ? "border-ink" : "border-transparent opacity-60 hover:opacity-100 hover:border-ink-line"}
            `}
          >
            <Image
              src={img.src}
              alt={img.altText}
              fill
              sizes="80px"
              quality={60}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="flex-1 relative">
        <div
          className={`
            relative aspect-product overflow-hidden rounded-md bg-surface-sunken cursor-zoom-in
            ${zoomed ? "cursor-zoom-out" : ""}
          `}
          onClick={() => setZoomed(!zoomed)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomed(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="img"
          aria-label={`${productName} — image ${activeIndex + 1} of ${images.length}.`}
        >
          <Image
            src={active.src}
            alt={active.altText}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 768px) 100vw, 550px"
            quality={90}
            className={`
              object-cover transition-transform duration-300 ease-out-expo
              ${zoomed ? "scale-[1.85]" : "scale-100"}
            `}
            style={
              zoomed
                ? { transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }
                : undefined
            }
            draggable={false}
          />

          {!zoomed && (
            <div className="absolute bottom-3 right-3 bg-surface-raised/70 backdrop-blur-sm rounded-full p-2 pointer-events-none">
              <ZoomIn size={14} className="text-ink-muted" />
            </div>
          )}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-surface-raised/80 backdrop-blur-sm rounded-full shadow-card-rest flex items-center justify-center text-ink-soft hover:bg-surface-raised hover:shadow-card-hover transition-all duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-surface-raised/80 backdrop-blur-sm rounded-full shadow-card-rest flex items-center justify-center text-ink-soft hover:bg-surface-raised hover:shadow-card-hover transition-all duration-200"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3 lg:hidden" aria-hidden>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`
                  w-1.5 h-1.5 rounded-full transition-all duration-200
                  ${i === activeIndex ? "bg-ink w-4" : "bg-ink-line"}
                `}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
