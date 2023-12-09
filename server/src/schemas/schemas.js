import { z } from 'zod';

export const loginSchema = z.object({
   cedula: z
      .number({ message: 'La cedula debe ser un numero' })
      .positive()
      .int(),
   clave: z
      .string()
      .min(6, { message: 'La clave debe tener minimo 6 caracteres' })
      .max(100),
});

export const createUserSchema = z.object({
   id_rol: z.number().positive().int(),
   username: z.string().min(2).max(50).trim().toUpperCase(),
   cedula: z.number().positive().int(),
   email: z.string().email().trim().toUpperCase(),
   password: z.string().min(6),
});
