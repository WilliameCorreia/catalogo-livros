import { z } from "zod";

export const CreateBookSchema = z
  .object({
    title: z.string().trim().min(1, "Título é obrigatório").max(255),
    author: z.string().trim().min(1, "Autor é obrigatório").max(255),
    category: z.string().trim().min(1, "Categoria é obrigatória").max(100),
  })
  .strict();

export type CreateBookDto = z.infer<typeof CreateBookSchema>;
