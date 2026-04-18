import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../../application/use-cases/UpdateBookUseCase";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
    return;
  }
  if (process.env.NODE_ENV !== "production") {
    console.error(`[ERROR] ${err.message}`, err.stack);
  } else {
    console.error(`[ERROR] ${err.message}`);
  }
  res.status(500).json({ error: "Erro interno do servidor" });
};
