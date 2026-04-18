import axios from "axios";
import { Book, CreateBookPayload, UpdateBookPayload } from "../types/book";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" },
});

export const bookService = {
  async getBooks(): Promise<Book[]> {
    const response = await api.get<{ data: Book[]; total: number }>("/books");
    return response.data.data;
  },

  async createBook(payload: CreateBookPayload): Promise<Book> {
    const response = await api.post<{ data: Book }>("/books", payload);
    return response.data.data;
  },

  async updateBook(id: string, payload: UpdateBookPayload): Promise<Book> {
    const response = await api.put<{ data: Book }>(`/books/${id}`, payload);
    return response.data.data;
  },

  async deleteBook(id: string): Promise<void> {
    await api.delete(`/books/${id}`);
  },
};
