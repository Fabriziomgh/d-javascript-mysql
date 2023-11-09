import { z } from 'zod';

export const registerSchema = z.object({
   username: z.string().min(1).max(50),
   email: z.string().email().max(100),
   password: z.string().min(6).max(100),
});

export const loginSchema = z.object({
   username: z.string().max(100),
   password: z.string().min(6).max(100),
});
