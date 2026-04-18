import { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md";
  isLoading?: boolean;
}

const styles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--accent)",
    color: "#fff",
  },
  secondary: {
    backgroundColor: "var(--surface-alt)",
    color: "var(--text-hi)",
    border: "1px solid var(--border)",
  },
  danger: {
    backgroundColor: "var(--danger)",
    color: "#fff",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--text-md)",
  },
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading,
  children,
  className,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-lg transition-opacity cursor-pointer disabled:opacity-40",
        size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-sm",
        className
      )}
      style={{ ...styles[variant], ...style }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.opacity = "1";
      }}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Aguarde...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
