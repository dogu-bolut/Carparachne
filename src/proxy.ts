import createMiddleware from "next-intl/middleware";

// Export as a named 'proxy' function instead of default
export const proxy = createMiddleware({
  // A list of all locales that are supported by your application
  locales: ["tr", "en"],

  // Used when no locale matches (e.g., someone visits carparachne.com/)
  defaultLocale: "tr",

  // Hides the /tr from the URL for the default language
  localePrefix: "as-needed",
});

// The matcher configuration remains exactly the same
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
