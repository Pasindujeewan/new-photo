"use client";

import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ToastTone = "success" | "error" | "info";

type Toast = {
  id: number;
  tone: ToastTone;
  message: string;
};

type ToastInput = {
  tone?: ToastTone;
  message: string;
};

type ToastContextValue = {
  showToast: (toast: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const icons = {
  success: CheckCircle2,
  error: TriangleAlert,
  info: Info
};

const toneStyles = {
  success: "border-green-700/15 bg-green-50 text-green-900",
  error: "border-red-700/15 bg-red-50 text-red-900",
  info: "border-ink/10 bg-white text-charcoal"
};

const iconStyles = {
  success: "text-green-700",
  error: "text-red-700",
  info: "text-gold"
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(({ tone = "info", message }: ToastInput) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current.slice(-2), { id, tone, message }]);
    window.setTimeout(() => dismissToast(id), tone === "error" ? 6500 : 4500);
  }, [dismissToast]);

  useEffect(() => {
    function showFriendlyError() {
      showToast({ tone: "error", message: "Something went wrong. Please try again in a moment." });
    }

    window.addEventListener("error", showFriendlyError);
    window.addEventListener("unhandledrejection", showFriendlyError);

    return () => {
      window.removeEventListener("error", showFriendlyError);
      window.removeEventListener("unhandledrejection", showFriendlyError);
    };
  }, [showToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed inset-x-0 top-4 z-[80] grid justify-items-center gap-3 px-4 sm:inset-x-auto sm:right-5 sm:top-5 sm:w-[360px] sm:justify-items-stretch sm:px-0" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => {
          const Icon = icons[toast.tone];

          return (
            <div key={toast.id} className={cn("flex w-full max-w-md items-start gap-3 rounded-lg border p-4 text-sm shadow-soft", toneStyles[toast.tone])}>
              <Icon className={cn("mt-0.5 shrink-0", iconStyles[toast.tone])} size={18} />
              <p className="min-w-0 flex-1 leading-6">{toast.message}</p>
              <button type="button" onClick={() => dismissToast(toast.id)} className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-current/60 transition hover:bg-black/5 hover:text-current" aria-label="Dismiss notification">
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  return context ?? { showToast: () => undefined };
}
