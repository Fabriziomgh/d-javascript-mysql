import { z } from 'zod';

export const registerSchema = z.object({
   id_rol: z.number().int().positive(),
   username: z.string().min(1).max(50),
   cedula: z.number().int().positive(),
   email: z.string().email().max(100),
   password: z.string(),
});

export const loginSchema = z.object({
   cedula: z.number().int().positive(),
   password: z.string(),
});
