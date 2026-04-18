"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

interface ConfirmState extends ConfirmOptions {
  resolver: (value: boolean) => void;
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfirmState | null>(null);
  const resolverRef = useRef<((v: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setState({ ...options, resolver: resolve });
    });
  }, []);

  const handle = (value: boolean) => {
    resolverRef.current?.(value);
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state && (
        <ConfirmDialogPortal
          options={state}
          onConfirm={() => handle(true)}
          onCancel={() => handle(false)}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): (options: ConfirmOptions) => Promise<boolean> {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm deve ser usado dentro de ConfirmProvider");
  return ctx.confirm;
}

function ConfirmDialogPortal({
  options,
  onConfirm,
  onCancel,
}: {
  options: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-lg)",
          animation: "toast-in 0.2s ease",
        }}
      >
        <div className="px-6 pt-6 pb-4">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
            style={{
              backgroundColor:
                options.variant === "danger"
                  ? "var(--danger-surface)"
                  : "var(--accent-surface)",
              color:
                options.variant === "danger" ? "var(--danger)" : "var(--accent)",
            }}
          >
            {options.variant === "danger" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            )}
          </div>

          <h3
            className="text-base font-semibold mb-1.5"
            style={{ color: "var(--text-hi)" }}
          >
            {options.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-md)" }}>
            {options.message}
          </p>
        </div>

        <div
          className="flex gap-2 justify-end px-6 py-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-opacity hover:opacity-70"
            style={{
              backgroundColor: "var(--surface-alt)",
              color: "var(--text-hi)",
              border: "1px solid var(--border)",
            }}
          >
            {options.cancelLabel ?? "Cancelar"}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-lg text-white transition-opacity hover:opacity-85"
            style={{
              backgroundColor:
                options.variant === "danger" ? "var(--danger)" : "var(--accent)",
            }}
          >
            {options.confirmLabel ?? "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
