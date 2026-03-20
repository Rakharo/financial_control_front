import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.email("Email inválido"),
  login: z.string().min(1, "Login obrigatório"),
  password: z
    .string()
    .min(8, "Pelo menos 8 caracteres")
    .regex(/[A-Z]/, "Pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Pelo menos uma letra minúscula")
    .regex(/\d/, "Pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "Pelo menos um caractere especial"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
