import { fetchBooks } from "../../lib/api";
import { Book } from "../../types/book";
import { BooksClient } from "./BooksClient";

export default async function BooksPage() {
  let books: Book[] = [];
  let error: string | null = null;

  try {
    books = await fetchBooks();
  } catch {
    error = "Falha ao carregar livros. Tente novamente.";
  }

  return <BooksClient books={books} error={error} />;
}
