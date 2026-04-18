import { IBookRepository } from "../../domain/repositories/IBookRepository";
import { NotFoundError } from "./UpdateBookUseCase";

export class DeleteBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.bookRepository.findById(id);
    if (!existing) throw new NotFoundError("Livro não encontrado");
    await this.bookRepository.delete(id);
  }
}
