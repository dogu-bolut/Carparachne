// src/app/providers.tsx
// ─── Client providers: React Query, Zustand hydration boundary ──────────────
"use client";

import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Providers({ children }: { children: React.ReactNode }) {
  // Create the client inside component so each request gets its own instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cache data for 5 minutes before considering it stale
            staleTime:            5 * 60 * 1000,
            // Keep unused data in cache for 10 minutes
            gcTime:               10 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry:                1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
