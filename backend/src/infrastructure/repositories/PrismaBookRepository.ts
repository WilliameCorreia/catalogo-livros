import { PrismaClient } from "@prisma/client";
import { IBookRepository } from "../../domain/repositories/IBookRepository";
import { Book, CreateBookInput } from "../../domain/entities/Book";

export class PrismaBookRepository implements IBookRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: { id } });
  }

  async create(input: CreateBookInput): Promise<Book> {
    return this.prisma.book.create({ data: input });
  }

  async update(id: string, input: CreateBookInput): Promise<Book> {
    return this.prisma.book.update({ where: { id }, data: input });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.book.delete({ where: { id } });
  }
}
