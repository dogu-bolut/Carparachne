import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Match this with your proxy locales
const locales = ["tr", "en"];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale, // <--- THIS IS THE FIX: Explicitly return the resolved locale
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
