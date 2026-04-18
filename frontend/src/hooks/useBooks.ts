"use client";

import { useState, useEffect, useCallback } from "react";
import { Book, CreateBookPayload, UpdateBookPayload } from "../types/book";
import { bookService } from "../services/bookService";

interface UseBooksReturn {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  addBook: (payload: CreateBookPayload) => Promise<void>;
  editBook: (id: string, payload: UpdateBookPayload) => Promise<void>;
  removeBook: (id: string) => Promise<void>;
  refresh: () => void;
}

export function useBooks(): UseBooksReturn {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await bookService.getBooks();
      setBooks(data);
    } catch {
      setError("Falha ao carregar livros. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = async (payload: CreateBookPayload) => {
    const created = await bookService.createBook(payload);
    setBooks((prev) => [created, ...prev]);
  };

  const editBook = async (id: string, payload: UpdateBookPayload) => {
    const updated = await bookService.updateBook(id, payload);
    setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
  };

  const removeBook = async (id: string) => {
    await bookService.deleteBook(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return { books, isLoading, error, addBook, editBook, removeBook, refresh: fetchBooks };
}
