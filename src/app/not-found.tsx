import Link from "next/link";
import "@/styles/globals.css"; // Ensure your Tailwind/CSS loads

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="min-h-[100vh] flex items-center justify-center bg-surface">
          <div className="text-center max-w-md px-6">
            <p className="font-display text-[120px] lg:text-[160px] font-light text-ink-line leading-none mb-6 select-none">
              404
            </p>
            <h1 className="text-2xl lg:text-3xl mb-4">Page not found</h1>
            <p className="text-base text-ink-muted mb-8 leading-relaxed">
              The page you're looking for has moved, been removed, or perhaps
              never existed.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {/* Pointing to /tr ensures they hit the default locale */}
              <Link href="/tr" className="btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
