import { Book } from "../types/book";

const backendUrl = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001";

export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(`${backendUrl}/api/books`, { cache: "no-store" });
  if (!res.ok) throw new Error("Falha ao carregar livros");
  const json: { data: Book[]; total: number } = await res.json();
  return json.data;
}
