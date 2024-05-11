import { z } from 'zod';
export const CreatePasswordSchema = z.object({
    password: z.string().min(8).transform((value) => value.trim()),
    confirmPassword: z.string().transform((value) => value.trim()),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword']
});