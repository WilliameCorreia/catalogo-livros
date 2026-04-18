"use client";

import { useState } from "react";
import { Book } from "../../types/book";
import { useConfirm } from "../../contexts/ConfirmContext";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const [hovered, setHovered] = useState(false);
  const confirm = useConfirm();

  return (
    <div
      className="relative flex flex-col rounded-xl p-5 transition-all"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: "var(--accent-surface)",
            color: "var(--accent-text)",
            border: "1px solid var(--accent-border)",
          }}
        >
          {book.category}
        </span>

        <div
          className="flex gap-1 transition-opacity"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <button
            onClick={() => onEdit(book)}
            className="p-1.5 rounded-lg transition-opacity hover:opacity-70"
            style={{ color: "var(--accent)", backgroundColor: "var(--accent-surface)" }}
            aria-label="Editar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
            </svg>
          </button>
          <button
            onClick={async () => {
              const ok = await confirm({
                title: "Excluir livro",
                message: `Tem certeza que deseja excluir "${book.title}"? Esta ação não pode ser desfeita.`,
                confirmLabel: "Excluir",
                cancelLabel: "Cancelar",
                variant: "danger",
              });
              if (ok) onDelete(book.id);
            }}
            className="p-1.5 rounded-lg transition-opacity hover:opacity-70"
            style={{ color: "var(--danger)", backgroundColor: "var(--danger-surface)" }}
            aria-label="Excluir"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-base leading-snug" style={{ color: "var(--text-hi)" }}>
        {book.title}
      </h3>
      <p className="text-sm mt-1" style={{ color: "var(--text-md)" }}>
        {book.author}
      </p>

      <div
        className="mt-4 pt-3 text-xs"
        style={{ color: "var(--text-lo)", borderTop: "1px solid var(--border)" }}
      >
        {new Date(book.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </div>
    </div>
  );
}
