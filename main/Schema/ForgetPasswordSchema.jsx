import { z } from 'zod';

export const ForgetPasswordSchema = z.object({
    email: z.string().email().transform((value) => value.trim()),
})