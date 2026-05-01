"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { X } from "lucide-react";
import { PRICE_PRESETS } from "./filterSidebar";

interface Props {
  searchParams: Record<string, string | undefined>;
}

interface Chip {
  label: string;
  paramKey: string;
  value?: string; // if undefined, the whole key is removed
}

export function ActiveFilterBar({ searchParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [, start] = useTransition();

  const chips: Chip[] = [];

  // Categories
  (searchParams.categories ?? "")
    .split(",")
    .filter(Boolean)
    .forEach((slug) => {
      chips.push({
        label: slug.replace("-", " "),
        paramKey: "categories",
        value: slug,
      });
    });

  // Price
  if (searchParams.minPrice || searchParams.maxPrice) {
    const min = Number(searchParams.minPrice ?? 0);
    const max = Number(searchParams.maxPrice ?? 9999);

    const preset = PRICE_PRESETS.find((p) => p.min === min && p.max === max);

    if (preset) {
      chips.push({ label: preset.label, paramKey: "priceRange" });
    } else {
      const minStr = searchParams.minPrice ? `€${searchParams.minPrice}` : "";
      const maxStr = searchParams.maxPrice ? `€${searchParams.maxPrice}` : "";
      const label =
        minStr && maxStr ? `${minStr} – ${maxStr}` : minStr || maxStr;
      chips.push({ label, paramKey: "priceRange" });
    }
  }

  // Tags
  (searchParams.tags ?? "")
    .split(",")
    .filter(Boolean)
    .forEach((tag) => {
      chips.push({ label: tag, paramKey: "tags", value: tag });
    });

  // In stock
  if (searchParams.inStock === "true") {
    chips.push({ label: "In stock", paramKey: "inStock" });
  }

  if (chips.length === 0) return null;

  function removeChip(chip: Chip) {
    const params = new URLSearchParams(searchParams as Record<string, string>);

    if (chip.paramKey === "categories" && chip.value) {
      const next = (searchParams.categories ?? "")
        .split(",")
        .filter(Boolean)
        .filter((s) => s !== chip.value)
        .join(",");
      next ? params.set("categories", next) : params.delete("categories");
    } else if (chip.paramKey === "tags" && chip.value) {
      const next = (searchParams.tags ?? "")
        .split(",")
        .filter(Boolean)
        .filter((t) => t !== chip.value)
        .join(",");
      next ? params.set("tags", next) : params.delete("tags");
    } else if (chip.paramKey === "priceRange") {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else {
      params.delete(chip.paramKey);
    }

    params.delete("page");
    start(() => router.push(`${pathname}?${params.toString()}`));
  }

  return (
    <div
      className="flex items-center flex-wrap gap-2"
      role="group"
      aria-label="Active filters"
    >
      {chips.map((chip) => (
        <span
          key={`${chip.paramKey}-${chip.value ?? "single"}`}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-raised border border-ink-line rounded-full text-xs font-medium text-ink-soft"
        >
          <span className="capitalize">{chip.label}</span>
          <button
            onClick={() => removeChip(chip)}
            className="text-ink-ghost hover:text-error transition-colors ml-0.5 flex-shrink-0"
            aria-label={`Remove filter: ${chip.label}`}
          >
            <X size={11} />
          </button>
        </span>
      ))}
    </div>
  );
}
