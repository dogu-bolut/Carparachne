"use server";

import { MOCK_PRODUCTS } from "@/lib/mock/mockProducts";
import { revalidatePath } from "next/cache";

export async function submitReview(productId: string, formData: FormData) {
  const author = formData.get("author") as string;
  const text = formData.get("text") as string;
  const rating = Number(formData.get("rating"));

  // Find the product in our mock database
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  // Initialize the reviews array with the mock data if it doesn't exist yet
  if (!product.reviews) {
    product.reviews = [
      { id: "1", author: "Alex M.", rating: 5, date: "2 weeks ago", text: "Absolutely love the quality. Fits perfectly and the material feels incredibly premium out of the box." },
      { id: "2", author: "Sarah T.", rating: 5, date: "1 month ago", text: "Beautifully made. I've been wearing it non-stop since it arrived. The minimalist design is exactly what I was looking for." },
    ];
  }

  // Create the new review
  const newReview = {
    id: Math.random().toString(36).substr(2, 9), // Fake ID
    author,
    rating,
    date: "Just now",
    text,
  };

  // Add the new review to the top of the list
  product.reviews.unshift(newReview);

  // Recalculate the global review count and average rating
  product.reviewCount = product.reviews.length;
  const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
  product.rating = Math.round((totalRating / product.reviewCount) * 10) / 10;

  // Tell Next.js to refresh the product page to show the updated count!
  revalidatePath(`/products/${product.slug}`);
}