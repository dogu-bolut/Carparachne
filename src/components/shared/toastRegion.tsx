// src/components/shared/ToastRegion.tsx
// ─── Radix Toast — global notification region ────────────────────────────────
"use client";

import * as Toast from "@radix-ui/react-toast";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useToastStore } from "@/lib/stores/toastStore";

const ICONS = {
  success: CheckCircle,
  error:   AlertCircle,
  info:    Info,
  warning: AlertTriangle,
};

const COLORS = {
  success: "text-success",
  error:   "text-error",
  info:    "text-info",
  warning: "text-warning",
};

export function ToastRegion() {
  const { toasts, dismiss } = useToastStore();

  return (
    <Toast.Provider swipeDirection="right" duration={4000}>
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type];
        return (
          <Toast.Root
            key={toast.id}
            open
            onOpenChange={(open) => { if (!open) dismiss(toast.id); }}
            duration={toast.duration ?? 4000}
            className="
              flex items-start gap-3 p-4
              bg-surface-raised rounded-lg border border-ink-line
              shadow-modal max-w-sm w-full
              data-[state=open]:animate-fade-up
              data-[state=closed]:animate-[fade-out_200ms_ease_forwards]
              data-[swipe=end]:animate-[slide-out-right_200ms_ease_forwards]
            "
          >
            <Icon size={18} className={`flex-shrink-0 mt-0.5 ${COLORS[toast.type]}`} />
            <div className="flex-1 min-w-0">
              <Toast.Title className="text-sm font-semibold text-ink-soft">
                {toast.title}
              </Toast.Title>
              {toast.description && (
                <Toast.Description className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                  {toast.description}
                </Toast.Description>
              )}
            </div>
            <Toast.Close asChild>
              <button
                className="flex-shrink-0 text-ink-ghost hover:text-ink transition-colors mt-0.5"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </Toast.Close>
          </Toast.Root>
        );
      })}

      {/* Toast viewport — fixed bottom-right */}
      <Toast.Viewport
        className="
          fixed bottom-6 right-6 z-toast
          flex flex-col gap-2.5 w-full max-w-sm
          list-none outline-none
        "
      />
    </Toast.Provider>
  );
}
