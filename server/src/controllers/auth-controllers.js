import bcrypt from 'bcryptjs';
import { AuthModel } from '../models/auth-models.js';
import { createToken } from '../libs/create-token.js';

export const register = async (req, res) => {
   try {
      const user = await AuthModel.create(req.body);
      if (user === null)
         return res.status(400).json({ error: 'Este correo ya existe' });

      const token = await createToken({ id: user.user_id });
      res.cookie('token', token);
      return res.status(201).json({
         user: user.username,
         email: user.email,
      });
   } catch (error) {
      return res.status(500).json(error);
   }
};

export const login = async (req, res) => {
   try {
      const user = await AuthModel.login(req.body);
      if (user === null)
         return res.status(400).json({ error: 'Este correo no existe' });

      const matchPassword = await bcrypt.compare(
         req.body.password,
         user.password
      );
      if (!matchPassword)
         return res.status(401).json({
            token: null,
            message: 'Contraseña invalida',
         });

      const token = await createToken({ id: user.user_id });
      res.cookie('token', token);
      res.status(200).json({
         user: user.username,
         email: user.email,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
   }
};

export const logout = (req, res) => {
   res.cookie('token', '', {
      expires: new Date(0),
   });
   res.sendStatus(200);
};

export const profile = async (req, res) => {
   const decoded = req.user;

   try {
      const user = await AuthModel.profile(decoded.id);
      return res.status(200).json(user);
   } catch (error) {
      console.log(error.message);
   }
};
