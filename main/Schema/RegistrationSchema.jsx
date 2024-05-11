import { z } from 'zod';
export const RegistrationSchema = z.object({
    email: z.string().email().transform((value) => value.trim()),
    password: z.string().min(8).transform((value) => value.trim()),
    firstName: z.string().min(1).max(50).transform((value) => value.trim()),
    lastName: z.string().min(1).max(50).transform((value) => value.trim()),
    phoneNumber: z.string().regex(/^\d{11}$/).transform((value) => value.trim()),
})