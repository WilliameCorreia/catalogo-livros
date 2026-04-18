import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { PrismaBookRepository } from "../../infrastructure/repositories/PrismaBookRepository";
import { ListBooksUseCase } from "../../application/use-cases/ListBooksUseCase";
import { CreateBookUseCase } from "../../application/use-cases/CreateBookUseCase";
import { UpdateBookUseCase } from "../../application/use-cases/UpdateBookUseCase";
import { DeleteBookUseCase } from "../../application/use-cases/DeleteBookUseCase";
import { validateBody } from "../middlewares/validate-body";
import { validateUuidParam } from "../middlewares/validate-uuid";
import { writeLimiter } from "../middlewares/rate-limiter";
import { CreateBookSchema } from "../dtos/CreateBookDto";
import prismaClient from "../../infrastructure/database/prisma-client";

const router = Router();

const repository = new PrismaBookRepository(prismaClient);
const listBooksUseCase = new ListBooksUseCase(repository);
const createBookUseCase = new CreateBookUseCase(repository);
const updateBookUseCase = new UpdateBookUseCase(repository);
const deleteBookUseCase = new DeleteBookUseCase(repository);
const controller = new BookController(
  listBooksUseCase,
  createBookUseCase,
  updateBookUseCase,
  deleteBookUseCase
);

router.get("/", controller.listBooks);
router.post("/", writeLimiter, validateBody(CreateBookSchema), controller.createBook);
router.put("/:id", writeLimiter, validateUuidParam("id"), validateBody(CreateBookSchema), controller.updateBook);
router.delete("/:id", writeLimiter, validateUuidParam("id"), controller.deleteBook);

export default router;
