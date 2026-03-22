import { z } from "zod";

export const profileSchema = z.object({
    name: z.string().min(2, "Nome obrigatório"),
    email: z.email().min(2, "Email obrigatório"),
    phone: z.string(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;