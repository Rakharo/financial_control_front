import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().min(2, "Título obrigatório"),
  amount: z.number().min(0.01, "Valor inválido"),
  category_id: z.number().min(1, "Selecione uma categoria"),
  type: z.string().min(1, "Selecione um tipo"),
  frequency: z.string().min(1, "Selecione a frequência"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;