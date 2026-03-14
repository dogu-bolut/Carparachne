import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image optimization ────────────────────────────────────────────────────
  images: {
    // Next.js automatically serves WebP/AVIF when the browser supports them
    formats: ["image/avif", "image/webp"],

    // Define breakpoints that match Tailwind screens for optimal srcSet
    deviceSizes:  [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes:   [16, 32, 48, 64, 80, 96, 128, 256, 384],

    // Domains / patterns for external images (CDN, Shopify, Contentful, etc.)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.carparachne.com",     // your production CDN
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // for development placeholder images
      },
      {
        protocol: "https",
        hostname: "*.shopify.com",       // if using Shopify Storefront API
      },
    ],

    // Minimum cache TTL for transformed images (seconds)
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ── Compiler options ──────────────────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  // ── Experimental ─────────────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-select",
    ],
    // Partial Pre-rendering (Next 15+) — static shell + dynamic streaming
  },

  // ── Headers ───────────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control",   value: "on" },
          { key: "X-Frame-Options",           value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Immutable cache for all Next.js static assets
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Long cache for public images
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=31536000" },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      { source: "/shop/all",    destination: "/shop",             permanent: true },
      { source: "/blog/index",  destination: "/blog",             permanent: true },
      { source: "/privacy",     destination: "/policies/privacy", permanent: true },
      { source: "/terms",       destination: "/policies/terms",   permanent: true },
    ];
  },

  // ── Webpack ───────────────────────────────────────────────────────────────
  webpack(config, { isServer }) {
    // Inline SVG support
    config.module.rules.push({
      test:  /\.svg$/,
      use:   ["@svgr/webpack"],
    });
    return config;
  },

  // Enable gzip compression
  compress: true,

  // Power-by header removal
  poweredByHeader: false,
};

export default nextConfig;
