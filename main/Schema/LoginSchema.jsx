import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email().transform((value) => value.trim()),
    password: z.string().min(8).transform((value) => value.trim()),
})