import { Router } from 'express';
import {
   forgotPassword,
   login,
   logout,
   profile,
   register,
   resetPassword,
   verifyT,
} from '../controllers/auth-controllers.js';
import { authVerify } from '../middlewares/auth-verify.js';
import { validateSchema } from '../middlewares/validate-schema.js';
import { registerSchema, loginSchema } from '../schemas/auth-schemas.js';

const authRouter = Router();

authRouter.post('/register', validateSchema(registerSchema), register);
authRouter.post('/login', validateSchema(loginSchema), login);
authRouter.post(
   '/forgot-password',
   validateSchema(registerSchema.partial()),
   forgotPassword
);
authRouter.post(
   '/reset-password/:token',
   validateSchema(loginSchema.partial()),
   resetPassword
);
authRouter.post('/logout', logout);
authRouter.get('/profile', authVerify, profile);
authRouter.get('/verify', verifyT);

export default authRouter;
