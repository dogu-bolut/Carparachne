import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cartPageClient";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review the items in your cart and proceed to checkout.",
};

export default function CartPage() {
  return <CartPageClient />;
}