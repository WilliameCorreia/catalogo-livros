import { Request, Response, NextFunction } from "express";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const validateUuidParam =
  (param: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const value = String(req.params[param] ?? "");
    if (!UUID_REGEX.test(value)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }
    next();
  };
