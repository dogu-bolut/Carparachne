// src/lib/stores/toastStore.ts
import { create } from "zustand";
import type { ToastMessage, ToastType } from "@/lib/types";

interface ToastState {
  toasts: ToastMessage[];
  toast:   (opts: { type: ToastType; title: string; description?: string | undefined; duration?: number | undefined }) => void;
  dismiss: (id: string) => void;
}

let uid = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  toast: ({ type, title, description, duration }) =>
    set((s) => ({
      toasts: [
        ...s.toasts,
        {
          id: `toast-${++uid}`,
          type,
          title,
          ...(description !== undefined ? { description } : {}),
          ...(duration   !== undefined ? { duration }   : {}),
        },
      ],
    })),

  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
