import createNextIntlPlugin from "next-intl/plugin";

// Point it to the i18n.ts file you just created
const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config options go here (if you have any)
};

export default withNextIntl(nextConfig);
