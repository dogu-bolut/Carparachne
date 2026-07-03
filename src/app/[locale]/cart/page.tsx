import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CartPageClient } from "@/components/cart/cartPageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cart.metadata" });
  
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CartPage() {
  return <CartPageClient />;
}