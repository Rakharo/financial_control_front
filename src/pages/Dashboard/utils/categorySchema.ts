import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  type: z.string().min(1, "Selecione um tipo"),
  color: z.string().optional()
});

export type CategoryFormData = z.infer<typeof categorySchema>;