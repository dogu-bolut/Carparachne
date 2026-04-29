"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { Product } from "@/lib/types";

export function ProductAccordion({ product }: { product: Product }) {
  const panels = [
    {
      value:   "description",
      label:   "Product Details",
      content: (
        <p className="text-sm leading-relaxed text-ink-muted">
          {product.description}
        </p>
      ),
    },
    {
      value: "specs",
      label: "Specifications",
      content: (
        <dl className="flex flex-col gap-3">
          {product.specs.map(({ label, value }) => (
            <div key={label} className="flex gap-4">
              <dt className="w-36 flex-shrink-0 text-xs font-medium uppercase tracking-wider text-ink-ghost">
                {label}
              </dt>
              <dd className="text-sm text-ink-muted">{value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      value: "shipping",
      label: "Shipping & Delivery",
      content: (
        <div className="text-sm text-ink-muted leading-relaxed space-y-3">
          <p>
            <strong className="font-medium text-ink-soft">Standard:</strong> Free on orders over €75. Delivered in 3–5 business days.
          </p>
          <p>
            <strong className="font-medium text-ink-soft">Express:</strong> 1–2 business days, calculated at checkout.
          </p>
          <p>
            <strong className="font-medium text-ink-soft">International:</strong> 7–12 business days. Free on orders over €120.
          </p>
          <p>
            <a href="/policies/shipping" className="text-accent hover:underline transition-colors">
              Full shipping policy →
            </a>
          </p>
        </div>
      ),
    },
    {
      value: "returns",
      label: "Returns & Exchanges",
      content: (
        <div className="text-sm text-ink-muted leading-relaxed space-y-3">
          <p>
            Free returns and exchanges within <strong className="font-medium text-ink-soft">30 days</strong> of delivery on all full-price items. Items must be unworn and in original packaging.
          </p>
          <p>
            <a href="/policies/returns" className="text-accent hover:underline transition-colors">
              Full returns policy →
            </a>
          </p>
        </div>
      ),
    },
  ];

  return (
    <Accordion.Root
      type="multiple"
      defaultValue={["description"]}
      className="flex flex-col"
    >
      {panels.map(({ value, label, content }) => (
        <Accordion.Item
          key={value}
          value={value}
          className="accordion-item"
        >
          <Accordion.Header>
            <Accordion.Trigger
              className="accordion-trigger group w-full flex items-center justify-between"
            >
              <span className="font-sans text-sm font-semibold text-ink-soft">
                {label}
              </span>
              <ChevronDown
                size={15}
                className="text-ink-ghost transition-transform duration-250 group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="overflow-hidden">
            <div className="accordion-content">
              {content}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
