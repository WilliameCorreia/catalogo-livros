"use client";

import { useEffect, useRef, useState } from "react";
import { ToastItem, useToastContext } from "../../contexts/ToastContext";

const config = {
  success: {
    bg: "var(--success-surface)",
    icon: "var(--success)",
    bar: "var(--success)",
    label: "Sucesso",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
  },
  error: {
    bg: "var(--danger-surface)",
    icon: "var(--danger)",
    bar: "var(--danger)",
    label: "Erro",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
  warning: {
    bg: "var(--warning-surface)",
    icon: "var(--warning)",
    bar: "var(--warning)",
    label: "Atenção",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  info: {
    bg: "var(--accent-surface)",
    icon: "var(--accent)",
    bar: "var(--accent)",
    label: "Informação",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
  },
};

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cfg = config[item.type];

  const dismiss = () => {
    setLeaving(true);
    timerRef.current = setTimeout(() => onDismiss(item.id), 280);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div
      style={{
        animation: leaving
          ? "toast-out 0.28s ease forwards"
          : "toast-in 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards",
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-lg)",
        overflow: "hidden",
        borderRadius: "14px",
        width: "340px",
        position: "relative",
      }}
    >
      <div className="flex items-start gap-3 px-4 pt-3.5 pb-3">
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
          style={{ backgroundColor: cfg.bg, color: cfg.icon }}
        >
          {cfg.svg}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight" style={{ color: "var(--text-hi)" }}>
            {item.title}
          </p>
          {item.message && (
            <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-md)" }}>
              {item.message}
            </p>
          )}
        </div>

        <button
          onClick={dismiss}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md mt-0.5 transition-opacity hover:opacity-60"
          style={{ color: "var(--text-lo)" }}
          aria-label="Fechar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ height: "3px", backgroundColor: "var(--border)" }}>
        <div
          style={{
            height: "100%",
            backgroundColor: cfg.bar,
            animation: `toast-progress ${item.duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, dismiss } = useToastContext();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed z-[100] flex flex-col gap-2"
      style={{ top: "72px", right: "16px" }}
    >
      {toasts.map((t) => (
        <ToastCard key={t.id} item={t} onDismiss={dismiss} />
      ))}
    </div>
  );
}
