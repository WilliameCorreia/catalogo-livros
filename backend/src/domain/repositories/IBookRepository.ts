import { Book, CreateBookInput } from "../entities/Book";

export interface IBookRepository {
  findAll(): Promise<Book[]>;
  findById(id: string): Promise<Book | null>;
  create(input: CreateBookInput): Promise<Book>;
  update(id: string, input: CreateBookInput): Promise<Book>;
  delete(id: string): Promise<void>;
}
