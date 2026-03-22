import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().min(1, "Usuário obrigatório"),
  password: z.string().min(1, "Senha obrigatória"),
});

export type LoginFormData = z.infer<typeof loginSchema>;