import { Router } from 'express';
import {
   createUser,
   deleteUser,
   getRoles,
   getUser,
   getUsers,
   updateUser,
} from '../controllers/users-controllers.js';
import { createUserSchema } from '../schemas/schemas.js';
import { validateSchema } from '../middlewares/validate-schema.js';
import { authVerify } from '../middlewares/auth-verify.js';
import { isAdmin } from '../middlewares/check-roles.js';

const usersRouter = Router();
usersRouter.get('/roles', authVerify, getRoles);
usersRouter.get('/', authVerify, getUsers);
usersRouter.get('/:id', authVerify, getUser);
usersRouter.patch(
   '/update/:id',
   [authVerify, isAdmin],
   validateSchema(createUserSchema.partial()),
   updateUser
);
usersRouter.post(
   '/create',
   [authVerify, isAdmin],
   validateSchema(createUserSchema),
   createUser
);

usersRouter.delete('/delete/:id', [authVerify, isAdmin], deleteUser);

export default usersRouter;
