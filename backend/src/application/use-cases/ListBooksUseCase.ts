import { IBookRepository } from "../../domain/repositories/IBookRepository";
import { Book } from "../../domain/entities/Book";

export class ListBooksUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }
}
