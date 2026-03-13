import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().min(2, "Título obrigatório"),
  amount: z.number().min(0.01, "Valor inválido"),
  installment_total: z.number(),
  category_id: z.number().min(1, "Selecione uma categoria"),
  transaction_date: z
    .custom<Dayjs | null>((val) => val === null || dayjs.isDayjs(val), {
      message: "Selecione a data de transação",
    }),
  type: z.string().min(1, "Selecione um tipo"),
  frequency: z.string().min(1, "Selecione a frequência"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;