// src/app/not-found.tsx
// ─── 404 Page ────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <p className="font-display text-[120px] lg:text-[160px] font-light text-ink-line leading-none mb-6 select-none">
          404
        </p>
        <h1 className="text-2xl lg:text-3xl mb-4">Page not found</h1>
        <p className="text-base text-ink-muted mb-8 leading-relaxed">
          The page you're looking for has moved, been removed, or perhaps never existed.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/"    className="btn-primary">Back to Home</Link>
          <Link href="/shop" className="btn-secondary">Browse Shop</Link>
        </div>
      </div>
    </div>
  );
}


// src/app/error.tsx
// ─── Runtime error boundary ──────────────────────────────────────────────────
