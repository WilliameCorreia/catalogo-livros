"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration: number;
}

interface ToastApi {
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

interface ToastContextValue {
  toasts: ToastItem[];
  toast: ToastApi;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const add = useCallback(
    (type: ToastType, title: string, message?: string, duration = 4000) => {
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  const toast: ToastApi = {
    success: (title, message) => add("success", title, message),
    error: (title, message) => add("error", title, message, 6000),
    warning: (title, message) => add("warning", title, message),
    info: (title, message) => add("info", title, message),
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast deve ser usado dentro de ToastProvider");
  return ctx.toast;
}

export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastContext deve ser usado dentro de ToastProvider");
  return ctx;
}
