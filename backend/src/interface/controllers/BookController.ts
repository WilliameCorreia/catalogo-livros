import { Request, Response, NextFunction } from "express";
import { ListBooksUseCase } from "../../application/use-cases/ListBooksUseCase";
import { CreateBookUseCase } from "../../application/use-cases/CreateBookUseCase";
import { UpdateBookUseCase } from "../../application/use-cases/UpdateBookUseCase";
import { DeleteBookUseCase } from "../../application/use-cases/DeleteBookUseCase";
import { CreateBookDto } from "../dtos/CreateBookDto";

export class BookController {
  constructor(
    private readonly listBooksUseCase: ListBooksUseCase,
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase
  ) {}

  listBooks = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const books = await this.listBooksUseCase.execute();
      res.json({ data: books, total: books.length });
    } catch (err) {
      next(err);
    }
  };

  createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dto: CreateBookDto = req.body;
      const book = await this.createBookUseCase.execute(dto);
      res.status(201).json({ data: book });
    } catch (err) {
      next(err);
    }
  };

  updateBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = String(req.params.id);
      const dto: CreateBookDto = req.body;
      const book = await this.updateBookUseCase.execute(id, dto);
      res.json({ data: book });
    } catch (err) {
      next(err);
    }
  };

  deleteBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = String(req.params.id);
      await this.deleteBookUseCase.execute(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
