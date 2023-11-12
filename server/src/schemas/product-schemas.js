import { z } from 'zod';

export const productSchema = z.object({
   producto: z.string().min(1).max(50),
   cantidad: z.number().int().positive(),
   descripcion: z.string().min(1).max(100),
   serial: z.string().min(1).max(100),
   id_ubicacion: z.number().int().positive(),
});
