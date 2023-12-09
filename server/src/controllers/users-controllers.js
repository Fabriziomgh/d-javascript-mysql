import { UsersModel } from '../models/users-models.js';

export const getRoles = async (req, res) => {
   try {
      const response = await UsersModel.getRoles();
      if (response.length === 0)
         return res.status(404).json({
            message: 'No se encontraron roles',
         });
      res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         message: error.message,
      });
   }
};
export const createUser = async (req, res) => {
   try {
      const result = await UsersModel.createUser({ data: req.body });
      const id = result.insertId;
      if (!!result.code)
         return res.status(400).json({
            message: 'No se pudo crear el usuario',
            error: result.sqlMessage,
         });
      const user = await UsersModel.user({ id });
      res.status(201).json(user);
   } catch (error) {
      return res.status(500).json({
         message: error.message,
      });
   }
};
export const updateUser = async (req, res) => {
   try {
      const result = await UsersModel.updateUser({
         id: req.params.id,
         data: req.body,
      });
      console.log(result);
      if (result.affectedRows === 0)
         return res.status(404).json({
            message: 'No se encontro el usuario',
         });
      res.sendStatus(204);
   } catch (error) {
      return res.status(500).json({
         message: error.message,
      });
   }
};
export const deleteUser = async (req, res) => {
   try {
      const [result] = await UsersModel.deleteUser({ id: req.params.id });
      if (result.affectedRows === 0)
         return res.status(404).json({
            message: 'No se encontro el usuario',
         });

      res.sendStatus(204);
   } catch (error) {
      return res.status(500).json({
         message: error.message,
      });
   }
};
export const getUsers = async (req, res) => {
   try {
      const response = await UsersModel.getUsers();
      if (response.length === 0)
         return res.status(404).json({
            message: 'No se encontraron usuarios',
         });
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         message: error.message,
      });
   }
};
export const getUser = async (req, res) => {
   try {
      const response = await UsersModel.getUser({ id: req.params.id });
      if (response.length === 0)
         return res.status(404).json({
            message: 'No se encontro el usuario',
         });
      return res.status(200).json(response);
   } catch (error) {
      return res.status(500).json({
         message: error.message,
      });
   }
};
