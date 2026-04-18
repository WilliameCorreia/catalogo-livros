import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
      <div
        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl text-4xl mb-8"
        style={{ backgroundColor: "var(--accent-surface)", border: "1px solid var(--accent-border)" }}
      >
        📚
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-3" style={{ color: "var(--text-hi)" }}>
        Catálogo de Livros
      </h1>

      <p className="text-base max-w-sm mb-8" style={{ color: "var(--text-md)" }}>
        Organize, descubra e gerencie sua coleção de livros com elegância.
      </p>

      <Link
        href="/books"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-85"
        style={{ backgroundColor: "var(--accent)", boxShadow: "var(--shadow-md)" }}
      >
        Ver Biblioteca
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>

      <div className="mt-16 grid grid-cols-3 gap-8 max-w-sm">
        {[
          { label: "Cadastre", desc: "Adicione livros com título, autor e categoria" },
          { label: "Organize", desc: "Visualize sua coleção em cards elegantes" },
          { label: "Gerencie", desc: "Edite ou remova livros a qualquer momento" },
        ].map(({ label, desc }) => (
          <div key={label} className="flex flex-col items-center gap-1 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              {label}
            </span>
            <span className="text-xs leading-relaxed" style={{ color: "var(--text-lo)" }}>
              {desc}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
