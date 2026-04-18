import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-xl">📚</span>
          <span
            className="font-semibold text-sm tracking-tight transition-opacity group-hover:opacity-70"
            style={{ color: "var(--text-hi)" }}
          >
            Catálogo de Livros
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/books"
            className="text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--text-md)" }}
          >
            Biblioteca
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
