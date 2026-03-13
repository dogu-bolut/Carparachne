// src/components/shared/FaqAccordion.tsx
// ─── Radix UI Accordion with smooth animation ────────────────────────────────
"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import type { FaqItem } from "@/lib/types";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="flex flex-col"
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          className="accordion-item"
        >
          <Accordion.Header>
            <Accordion.Trigger
              className="accordion-trigger group"
              aria-label={item.question}
            >
              <span className="text-left pr-6">{item.question}</span>
              {/* Animated +/– icon */}
              <span
                className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-ink-ghost group-data-[state=open]:text-accent transition-colors duration-200"
                aria-hidden
              >
                <Plus
                  size={14}
                  className="absolute transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90"
                />
                <Minus
                  size={14}
                  className="absolute transition-all duration-300 opacity-0 group-data-[state=open]:opacity-100"
                />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content
            className="overflow-hidden data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_150ms_ease-in]"
          >
            <div className="accordion-content pr-8">
              {/* Support HTML content from CMS */}
              <p
                className="text-sm leading-relaxed text-ink-muted"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
