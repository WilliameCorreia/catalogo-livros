"use server";

import { revalidatePath } from "next/cache";
import { Book, CreateBookPayload, UpdateBookPayload } from "../../types/book";

const backendUrl = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001";

export async function createBookAction(payload: CreateBookPayload): Promise<Book> {
  const res = await fetch(`${backendUrl}/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao criar livro");
  const json: { data: Book } = await res.json();
  revalidatePath("/books");
  return json.data;
}

export async function updateBookAction(id: string, payload: UpdateBookPayload): Promise<Book> {
  const res = await fetch(`${backendUrl}/api/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Falha ao atualizar livro");
  const json: { data: Book } = await res.json();
  revalidatePath("/books");
  return json.data;
}

export async function deleteBookAction(id: string): Promise<void> {
  const res = await fetch(`${backendUrl}/api/books/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Falha ao excluir livro");
  revalidatePath("/books");
}
