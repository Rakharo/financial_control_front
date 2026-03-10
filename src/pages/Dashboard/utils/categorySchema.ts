import { z } from "zod";

export const categorySchema = z.object({
  Name: z.string().min(2, "Nome obrigatório"),
  Type: z.enum(["income", "expense"]),
});

export type CategoryFormData = z.infer<typeof categorySchema>;