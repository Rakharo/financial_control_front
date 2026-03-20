import { z } from "zod";

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Informe a senha atual"),
    newPassword: z
      .string()
      .min(8, "Pelo menos 8 caracteres")
      .regex(/[A-Z]/, "Pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Pelo menos uma letra minúscula")
      .regex(/\d/, "Pelo menos um número")
      .regex(/[^A-Za-z0-9]/, "Pelo menos um caractere especial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Senha de confirmação precisa ser idêntica",
    path: ["senhaNovaConfirmacao"],
  });

export type PasswordFormData = z.infer<typeof passwordSchema>;
