export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  createdAt: string;
}

export interface CreateBookPayload {
  title: string;
  author: string;
  category: string;
}

export type UpdateBookPayload = CreateBookPayload;

export type BookCategory =
  | "Tecnologia"
  | "Ficção"
  | "Não Ficção"
  | "Ciência"
  | "História"
  | "Biografia"
  | "Romance"
  | "Autoajuda"
  | "Negócios"
  | "Outros";

export const BOOK_CATEGORIES: BookCategory[] = [
  "Tecnologia",
  "Ficção",
  "Não Ficção",
  "Ciência",
  "História",
  "Biografia",
  "Romance",
  "Autoajuda",
  "Negócios",
  "Outros",
];
