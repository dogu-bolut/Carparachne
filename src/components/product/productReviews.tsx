"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { submitReview } from "@/lib/utils/actions";

export function ProductReviews({ product }: { product: Product }) {
  const [isWriting, setIsWriting] = useState(false);
  const [formRating, setFormRating] = useState(5);

  // If the product doesn't have reviews yet, use the default mock ones
  const reviews = product.reviews || [
    { id: "1", author: "Alex M.", rating: 5, date: "2 weeks ago", text: "Absolutely love the quality. Fits perfectly and the material feels incredibly premium out of the box." },
    { id: "2", author: "Sarah T.", rating: 5, date: "1 month ago", text: "Beautifully made. I've been wearing it non-stop since it arrived. The minimalist design is exactly what I was looking for." },
  ];

  // The actual review count derived from the data
  const currentCount = product.reviewCount || reviews.length;

  async function handleAction(formData: FormData) {
    formData.append("rating", formRating.toString());
    await submitReview(product.id, formData);
    setIsWriting(false); // Close the form when done
    setFormRating(5);    // Reset stars
  }

  return (
    <section id="reviews" className="scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-ink-line pb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Customer Reviews</h2>
          <div className="flex items-center gap-2">
            <div className="flex text-ink">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm text-ink-muted">
              Based on {currentCount} reviews
            </span>
          </div>
        </div>
        <button 
          onClick={() => setIsWriting(!isWriting)}
          className="btn-secondary w-full sm:w-auto py-2.5 px-6"
        >
          {isWriting ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {/* Write a Review Form */}
      {isWriting && (
        <form action={handleAction} className="mb-10 bg-surface-sunken p-6 rounded-md border border-ink-line">
          <h3 className="font-semibold mb-4">Leave your review</h3>
          
          <div className="mb-4">
            <label className="block text-sm text-ink-muted mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormRating(star)}
                  className="text-ink hover:scale-110 transition-transform"
                >
                  <Star size={20} fill={star <= formRating ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block text-sm text-ink-muted mb-2">Name</label>
            <input 
              type="text" 
              name="author" 
              id="author" 
              required
              placeholder="How should we display your name?"
              className="w-full bg-transparent border border-ink-line rounded px-4 py-2 text-sm focus:border-ink outline-none"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="text" className="block text-sm text-ink-muted mb-2">Review</label>
            <textarea 
              name="text" 
              id="text" 
              required
              rows={4}
              placeholder="What did you think about this product?"
              className="w-full bg-transparent border border-ink-line rounded px-4 py-2 text-sm focus:border-ink outline-none resize-none"
            />
          </div>

          <button type="submit" className="btn-primary py-2.5 px-8">
            Submit Review
          </button>
        </form>
      )}

      {/* Review List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {reviews.map((review) => (
          <div key={review.id} className="bg-surface-sunken p-6 rounded-md">
            <div className="flex items-center gap-1 mb-4 text-ink">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill={i < review.rating ? "currentColor" : "none"} 
                  strokeWidth={i < review.rating ? 0 : 2} 
                />
              ))}
            </div>
            <h4 className="font-semibold text-sm mb-1">{review.author}</h4>
            <p className="text-xs text-ink-muted mb-4">{review.date}</p>
            <p className="text-sm text-ink-soft leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}