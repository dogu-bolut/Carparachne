"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { SlidersHorizontal, X } from "lucide-react";
import { FilterSidebar } from "./filterSidebar";

interface Props {
  searchParams: Record<string, string | undefined>;
}

export function MobileFilterSheet({ searchParams }: Props) {
  const activeCount = [
    (searchParams.categories ?? "").split(",").filter(Boolean).length,
    searchParams.minPrice ? 1 : 0,
    searchParams.maxPrice ? 1 : 0,
    searchParams.inStock === "true" ? 1 : 0,
    (searchParams.tags ?? "").split(",").filter(Boolean).length,
  ].reduce((a, b) => a + b, 0);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="btn-secondary flex items-center gap-2 text-sm lg:hidden">
          <SlidersHorizontal size={15} />
          Filters
          {activeCount > 0 && (
            <span className="badge badge-accent ml-1">{activeCount}</span>
          )}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-overlay bg-surface-overlay animate-fade-in" />

        <Dialog.Content
          className="
            fixed inset-y-0 left-0 z-drawer
            w-[88vw] max-w-sm
            bg-surface-raised shadow-drawer
            flex flex-col
            animate-slide-in-right
            outline-none
          "
          aria-label="Product filters"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-ink-line">
            <Dialog.Title className="font-sans text-base font-semibold text-ink-soft flex items-center gap-2">
              <SlidersHorizontal size={16} />
              Filters
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="btn-ghost p-1.5" aria-label="Close filters">
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          {/* Scrollable filter content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <FilterSidebar searchParams={searchParams} />
          </div>

          {/* Footer CTA */}
          <div className="border-t border-ink-line px-6 py-4">
            <Dialog.Close asChild>
              <button className="btn-primary w-full">
                View Results
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
