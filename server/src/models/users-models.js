import pool from '../database.js';
import bcrypt from 'bcryptjs';

export class UsersModel {
   static async findRole({ id }) {
      try {
         const [result] = await pool.query(
            'SELECT usuarios.user_id, usuarios.username, roles.rol FROM usuarios JOIN roles ON usuarios.id_rol = roles.id_rol WHERE usuarios.user_id = ?',
            [id]
         );
         return result[0];
      } catch (error) {
         return error;
      }
   }
   static async user({ id }) {
      try {
         const [result] = await pool.query(
            `SELECT u.user_id, u.username, u.cedula, u.email, u.password, r.rol, u.fecha_creacion
            FROM usuarios u JOIN roles r ON u.id_rol = r.id_rol WHERE u.user_id = ?`,
            [id]
         );
         return result[0];
      } catch (error) {
         return error;
      }
   }
   static async getRoles() {
      try {
         const [result] = await pool.query('SELECT * FROM roles');
         return result;
      } catch (error) {
         return error;
      }
   }
   static async getUsers() {
      try {
         const [result] =
            await pool.query(`SELECT u.user_id, u.username,  u.cedula, u.email, u.password, r.rol
            FROM usuarios u JOIN roles r ON u.id_rol = r.id_rol`);
         return result;
      } catch (error) {
         return error;
      }
   }
   static async getUser({ id }) {
      try {
         const [result] = await pool.query(
            `SELECT * FROM usuarios WHERE id_rol = ?`,
            [id]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
   static async createUser({ data }) {
      const { id_rol, username, cedula, email, password } = data;

      try {
         const hashPassword = await bcrypt.hash(password, 10);
         const [result] = await pool.query(
            'INSERT INTO usuarios (id_rol, username, cedula, email, password) VALUES (?, ?, ?, ?, ?)',
            [
               id_rol,
               username.trim().toUpperCase(),
               cedula,
               email.trim().toUpperCase(),
               hashPassword,
            ]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
   static async updateUser({ id, data }) {
      const { id_rol, username, cedula, email, password } = data;

      const [userPassword] = await pool.query(
         'SELECT password FROM usuarios WHERE user_id = ?',
         [id]
      );
      let hashPassword = null;
      if (password !== userPassword[0].password) {
         hashPassword = await bcrypt.hash(password, 10);
      }
      try {
         const [result] = await pool.query(
            `
            UPDATE usuarios 
            SET id_rol = IFNULL(?,id_rol), 
            username = IFNULL(?,username), 
            cedula = IFNULL(?,cedula), 
            email = IFNULL(?,email), 
            password = IF(? IS NULL, password, ?) WHERE user_id = ?
            `,
            [id_rol, username, cedula, email, hashPassword, hashPassword, id]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
   static async deleteUser({ id }) {
      try {
         const result = await pool.query(
            'DELETE FROM usuarios WHERE user_id = ?',
            [id]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
}
