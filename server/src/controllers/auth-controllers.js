import bcrypt from 'bcryptjs';
import { AuthModel } from '../models/auth-models.js';
import { createToken } from '../libs/create-token.js';
import { sendMail } from '../libs/send-mail.js';
import { verifyToken } from '../libs/verify-token.js';

export const register = async (req, res) => {
   try {
      const user = await AuthModel.create(req.body);
      if (user === null)
         return res
            .status(400)
            .json({ error: 'Este correo o usuario ya existe' });

      return res.status(201).json(user);
   } catch (error) {
      return res.status(500).json(error);
   }
};

export const login = async (req, res) => {
   try {
      const user = await AuthModel.login(req.body.cedula);
      if (user === null)
         return res.status(400).json({ message: 'Este usuario no existe' });

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
      res.status(200).json(user);
   } catch (error) {
      console.log(error);
      return res.status(500).json(error.message);
   }
};

export const forgotPassword = async (req, res) => {
   const { email } = req.body;
   try {
      const user = await AuthModel.findByEmail({ email });

      if (!user)
         return res.status(404).json({
            message: 'Usuario no encontrado',
         });

      const token = await createToken({ id: user.user_id }, 900);
      console.log(token);
      await sendMail(
         user.email,
         'Restablecer Contraseña',
         `Para restablecer su contraseña,haga click en el siguiente enlace:\n\n
         http://localhost:5173/nueva-clave/${token.replaceAll('.', '$')}`,
         (err, info) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({
               message: `Correo enviado correctamente a ${info.envelope.to[0]}`,
            });
         }
      );
   } catch (error) {
      return res.status(500).json({
         message: error.message,
      });
   }
};

export const resetPassword = async (req, res) => {
   const { token } = req.params;
   const { password } = req.body;

   try {
      const { id } = await verifyToken(token);
      console.log(id, password);
      if (!password)
         return res
            .status(400)
            .json({ message: 'Error al intentar actualizar la clave' });
      const updatePassword = await AuthModel.resetPassword({
         id,
         newPassword: password,
      });

      console.log(updatePassword);
      res.send({
         updatePassword,
      });
   } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Fallido', error });
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
export const verifyT = async (req, res) => {
   const { token } = req.cookies;

   if (!token) return res.status(401).json({ message: 'No token provided' });
   const verify = await verifyToken(token);
   if (!verify) return res.status(401);
   const { id } = verify;
   const user = await AuthModel.profile(id);
   if (!user) return res.status(401);

   return res.json(user);
};
