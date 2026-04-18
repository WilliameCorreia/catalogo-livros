import { Book } from "../../types/book";
import { BookCard } from "./BookCard";

interface BookListProps {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export function BookList({ books, isLoading, error, onEdit, onDelete }: BookListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl h-40 animate-pulse"
            style={{ backgroundColor: "var(--surface-alt)" }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-xl px-5 py-4 text-sm font-medium"
        style={{
          backgroundColor: "var(--danger-surface)",
          color: "var(--danger)",
          border: "1px solid var(--danger)",
        }}
      >
        {error}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div
        className="rounded-xl py-20 flex flex-col items-center gap-3"
        style={{ backgroundColor: "var(--surface)", border: "1px dashed var(--border)" }}
      >
        <span className="text-4xl">📖</span>
        <p className="font-medium text-sm" style={{ color: "var(--text-md)" }}>
          Nenhum livro cadastrado ainda.
        </p>
        <p className="text-xs" style={{ color: "var(--text-lo)" }}>
          Clique em &quot;+ Adicionar Livro&quot; para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
