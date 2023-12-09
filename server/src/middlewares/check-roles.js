import { UsersModel } from '../models/users-models.js';

export const isAdmin = async (req, res, next) => {
   const { id } = req.user;

   try {
      const user = await UsersModel.findRole({ id });
      if (user.rol !== 'ADMINISTRADOR')
         return res
            .status(403)
            .json({ message: 'No autorizado, NO ERES ADMINISTRADOR' });
      next();
   } catch (error) {
      return res.status(400).json({
         message: 'ERROR EN EL MIDDLEWARE',
      });
   }
};

export const isAnalista = async (req, res, next) => {
   const { id } = req.user;
   try {
      const user = await UsersModel.findRole({ id });
      if (user.rol !== 'ANALISTA')
         return res
            .status(403)
            .json({ message: 'Se necesita rol de analista' });
      next();
   } catch (error) {
      return res.status(400).json({
         message: 'ERROR EN EL MIDDLEWARE',
      });
   }
};

export const esAdminOAnalista = async (req, res, next) => {
   const { id } = req.user;
   try {
      const user = await UsersModel.findRole({ id });
      console.log(user.rol);
      if (user.rol !== 'ADMINISTRADOR' && user.rol !== 'ANALISTA')
         return res.status(403).json({
            message: 'Se necesita rol de administrador o analista',
         });
      next();
   } catch (error) {
      return res.status(400).json({
         message: 'ERROR EN EL MIDDLEWARE',
      });
   }
};
