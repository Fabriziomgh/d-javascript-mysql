import { Router } from 'express';
import {
   login,
   logout,
   profile,
   register,
} from '../controllers/auth-controllers.js';
import { authVerify } from '../middlewares/auth-verify.js';
import { validateSchema } from '../middlewares/validate-schema.js';
import { registerSchema, loginSchema } from '../schemas/auth-schemas.js';

const authRouter = Router();

authRouter.post('/register', validateSchema(registerSchema), register);
authRouter.post('/login', validateSchema(loginSchema), login);
authRouter.post('/logout', logout);
authRouter.get('/profile', authVerify, profile);

export default authRouter;
