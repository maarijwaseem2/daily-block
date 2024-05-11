import { z } from 'zod';

export const settingsSchema = z.object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20),
    email: z.string().email().transform((value) => value.trim()),
    password: z.string().min(8).transform((value) => value.trim()),
    oldPassword: z.string().min(8).transform((value) => value.trim()),
    newPassword: z.string().min(8).transform((value) => value.trim()),
    confirmPassword: z.string().min(8).transform((value) => value.trim()),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['ConfirmPassword']
})