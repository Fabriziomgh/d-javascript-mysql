import { Router } from 'express';
import {
   createUbicacion,
   deleteUbicacion,
   getAllUbicaciones,
   updateUbicacion,
} from '../controllers/ubicaciones-controllers.js';

const ubicacionesRouter = Router();

ubicacionesRouter.get('/', getAllUbicaciones);
ubicacionesRouter.post('/', createUbicacion);
ubicacionesRouter.patch('/:id', updateUbicacion);
ubicacionesRouter.delete('/:id', deleteUbicacion);

export default ubicacionesRouter;
