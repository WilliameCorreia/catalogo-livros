import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: "var(--text-hi)" }}
      >
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className="rounded-lg px-3 py-2 text-sm outline-none ring-0 transition-shadow"
        style={{
          backgroundColor: "var(--surface)",
          color: "var(--text-hi)",
          border: `1px solid ${error ? "var(--danger)" : "var(--border)"}`,
          boxShadow: "var(--shadow-sm)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.boxShadow = `0 0 0 3px var(--accent-surface)`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error
            ? "var(--danger)"
            : "var(--border)";
          e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        }}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium" style={{ color: "var(--danger)" }}>
          {error}
        </span>
      )}
    </div>
  )
);
Input.displayName = "Input";
