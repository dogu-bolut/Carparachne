import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // ── Override defaults entirely to enforce the design token system ──
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1920px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      // ── Neutrals (Primary palette) ──────────────────────────────────
      ink: {
        DEFAULT: "#1A1A1A", // Primary text / deep charcoal
        soft:    "#2C2C2C", // Secondary text / headings
        muted:   "#5A5A5A", // Captions, labels
        ghost:   "#9A9A9A", // Placeholder text
        line:    "#D4D4D4", // Dividers, borders
      },
      // ── Surface / Background ─────────────────────────────────────────
      surface: {
        DEFAULT: "#F7F6F4", // Main page background — warm off-white
        raised:  "#FFFFFF", // Cards, modals, drawers
        sunken:  "#EFEDE9", // Input fields, code blocks
        overlay: "rgba(26,26,26,0.48)", // Modal backdrops
      },
      // ── Accent (CTA, interactive highlights) ────────────────────────
      accent: {
        DEFAULT: "#C8976A", // Warm sand-terracotta — versatile across sectors
        hover:   "#B5845A", // Darker state on hover
        light:   "#F3E8DE", // Tinted background for badges / highlights
        contrast: "#FFFFFF", // Text on top of accent buttons
      },
      // ── Semantic colors ──────────────────────────────────────────────
      success: { DEFAULT: "#3D7A5F", light: "#E6F4EF" },
      warning: { DEFAULT: "#C47B2B", light: "#FBF0E0" },
      error:   { DEFAULT: "#C04040", light: "#FAEAEA" },
      info:    { DEFAULT: "#3A6FA8", light: "#E7EFF8" },
      // ── Utility ──────────────────────────────────────────────────────
      white: "#FFFFFF",
      black: "#000000",
    },
    fontFamily: {
      // UI + body — Cormorant pairs luxuriously; swap for DM Sans for tech sectors
      sans:    ["var(--font-body)", "system-ui", "sans-serif"],
      // Headings — refined editorial feel
      display: ["var(--font-display)", "Georgia", "serif"],
      // Monospace for specs / code snippets
      mono:    ["var(--font-mono)", "Menlo", "monospace"],
    },
    fontSize: {
      // Fluid type scale (clamp) — defined as CSS vars in globals.css
      // Tailwind class → maps to var(--text-*)
      "2xs":  ["0.625rem",  { lineHeight: "1rem"   }],
      xs:     ["0.75rem",   { lineHeight: "1.125rem" }],
      sm:     ["0.875rem",  { lineHeight: "1.375rem" }],
      base:   ["1rem",      { lineHeight: "1.625rem" }],
      lg:     ["1.125rem",  { lineHeight: "1.75rem" }],
      xl:     ["1.25rem",   { lineHeight: "1.875rem" }],
      "2xl":  ["1.5rem",    { lineHeight: "2rem"    }],
      "3xl":  ["1.875rem",  { lineHeight: "2.375rem" }],
      "4xl":  ["2.25rem",   { lineHeight: "2.75rem" }],
      "5xl":  ["3rem",      { lineHeight: "3.5rem"  }],
      "6xl":  ["3.75rem",   { lineHeight: "4.25rem" }],
      "7xl":  ["4.5rem",    { lineHeight: "5rem"    }],
      "8xl":  ["6rem",      { lineHeight: "6.5rem"  }],
    },
    fontWeight: {
      light:    "300",
      normal:   "400",
      medium:   "500",
      semibold: "600",
      bold:     "700",
    },
    letterSpacing: {
      tightest: "-0.04em",
      tighter:  "-0.02em",
      tight:    "-0.01em",
      normal:   "0em",
      wide:     "0.02em",
      wider:    "0.05em",
      widest:   "0.12em",  // Used for all-caps labels / category tags
    },
    spacing: {
      // 4px base unit grid
      px:   "1px",
      0:    "0px",
      0.5:  "2px",
      1:    "4px",
      1.5:  "6px",
      2:    "8px",
      2.5:  "10px",
      3:    "12px",
      3.5:  "14px",
      4:    "16px",
      5:    "20px",
      6:    "24px",
      7:    "28px",
      8:    "32px",
      9:    "36px",
      10:   "40px",
      11:   "44px",
      12:   "48px",
      14:   "56px",
      16:   "64px",
      18:   "72px",
      20:   "80px",
      24:   "96px",
      28:   "112px",
      32:   "128px",
      36:   "144px",
      40:   "160px",
      48:   "192px",
      56:   "224px",
      64:   "256px",
      72:   "288px",
      80:   "320px",
      96:   "384px",
    },
    borderRadius: {
      none:  "0px",
      xs:    "2px",
      sm:    "4px",
      DEFAULT:"6px",
      md:    "8px",
      lg:    "12px",
      xl:    "16px",
      "2xl": "24px",
      "3xl": "32px",
      full:  "9999px",
    },
    extend: {
      // ── Shadows ───────────────────────────────────────────────────────
      boxShadow: {
        "card-rest":  "0 1px 3px rgba(26,26,26,0.06), 0 1px 2px rgba(26,26,26,0.04)",
        "card-hover": "0 8px 24px rgba(26,26,26,0.10), 0 2px 6px rgba(26,26,26,0.06)",
        "drawer":     "-4px 0 32px rgba(26,26,26,0.12)",
        "modal":      "0 24px 64px rgba(26,26,26,0.18)",
        "btn":        "0 2px 8px rgba(200,151,106,0.30)",
        "btn-hover":  "0 4px 16px rgba(200,151,106,0.45)",
        "inset-subtle":"inset 0 1px 3px rgba(26,26,26,0.08)",
      },
      // ── Transitions ───────────────────────────────────────────────────
      transitionTimingFunction: {
        "out-expo":   "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-smooth":"cubic-bezier(0.4, 0, 0.2, 1)",
        "spring":     "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "700": "700ms",
      },
      // ── Z-index ──────────────────────────────────────────────────────
      zIndex: {
        behind:  "-1",
        base:    "0",
        raised:  "10",
        sticky:  "40",
        overlay: "50",
        drawer:  "60",
        modal:   "70",
        toast:   "80",
        tooltip: "90",
      },
      // ── Grid ─────────────────────────────────────────────────────────
      gridTemplateColumns: {
        "product-sm": "repeat(2, 1fr)",
        "product-md": "repeat(3, 1fr)",
        "product-lg": "repeat(4, 1fr)",
        "shop-layout": "280px 1fr",         // Sidebar + main
        "pdp-layout":  "1fr 480px",         // Gallery + info
        "alternating": "1fr 1fr",
      },
      // ── Max widths ────────────────────────────────────────────────────
      maxWidth: {
        "prose-narrow": "60ch",
        "prose":        "72ch",
        "prose-wide":   "84ch",
        "container":    "1280px",
        "container-wide": "1440px",
      },
      // ── Aspect ratios ────────────────────────────────────────────────
      aspectRatio: {
        "product":    "3 / 4",   // Portrait product images
        "hero":       "16 / 7",
        "hero-mobile":"4 / 5",
        "blog-thumb": "16 / 9",
        "team":       "1 / 1",
      },
      // ── Animations ───────────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%":   { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up":          "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in":          "fade-in 0.3s ease both",
        "slide-in-right":   "slide-in-right 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-out-right":  "slide-out-right 0.3s ease-in both",
        "scale-in":         "scale-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) both",
        "shimmer":          "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
  ],
};

export default config;