import { IBookRepository } from "../../domain/repositories/IBookRepository";
import { Book, CreateBookInput } from "../../domain/entities/Book";

export class UpdateBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(id: string, input: CreateBookInput): Promise<Book> {
    const existing = await this.bookRepository.findById(id);
    if (!existing) throw new NotFoundError("Livro não encontrado");
    if (!input.title.trim()) throw new Error("O título do livro não pode estar vazio");
    return this.bookRepository.update(id, input);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
