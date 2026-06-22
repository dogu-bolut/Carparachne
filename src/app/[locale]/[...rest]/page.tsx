import { notFound } from "next/navigation";

export default function CatchAllPage() {
  // This explicitly triggers your localized not-found.tsx
  notFound();
}
