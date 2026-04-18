import { IBookRepository } from "../../domain/repositories/IBookRepository";
import { Book, CreateBookInput } from "../../domain/entities/Book";

export class CreateBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(input: CreateBookInput): Promise<Book> {
    if (!input.title.trim()) {
      throw new Error("O título do livro não pode estar vazio");
    }
    return this.bookRepository.create(input);
  }
}
