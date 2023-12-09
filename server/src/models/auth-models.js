import pool from '../database.js';
import bcrypt from 'bcryptjs';

export class AuthModel {
   static async create(data) {
      const { username, email, password, cedula, id_rol } = data;

      try {
         const [checkEmail] = await pool.query(
            `SELECT * FROM usuarios WHERE email = ?`,
            [email]
         );
         const [checkUsername] = await pool.query(
            `SELECT * FROM usuarios WHERE username = ?`,
            [username]
         );
         const [checkCedula] = await pool.query(
            `SELECT * FROM usuarios WHERE cedula = ?`,
            [cedula]
         );
         if (
            checkEmail.length > 0 ||
            checkUsername.length > 0 ||
            checkCedula > 0
         )
            return null;
         const hashPassword = await bcrypt.hash(password, 10);
         const [result] = await pool.query(
            `INSERT INTO usuarios (id_rol,username,cedula, email, password) VALUES (?,?,?,?,?)`,
            [
               id_rol,
               username.trim().toUpperCase(),
               cedula,
               email.trim().toUpperCase(),
               hashPassword,
            ]
         );
         const [user] = await pool.query(
            `SELECT * FROM usuarios WHERE user_id = ?`,
            [result.insertId]
         );
         return user[0];
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }
   static async login(cedula) {
      try {
         const [user] = await pool.query(
            `SELECT * FROM usuarios WHERE cedula = ?`,
            [cedula]
         );
         if (user.length === 0) return null;
         return user[0];
      } catch (error) {
         return error;
      }
   }
   static async findByEmail({ email }) {
      try {
         const [result] = await pool.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
         );
         return result[0];
      } catch (error) {
         return error;
      }
   }
   static async profile(id) {
      try {
         const [user] = await pool.query(
            `SELECT * FROM usuarios WHERE user_id = ?`,
            [id]
         );
         if (user.length === 0) return null;
         return user[0];
      } catch (error) {
         return error;
      }
   }
   static async resetPassword({ id, newPassword }) {
      try {
         const newPasswordHash = await bcrypt.hash(newPassword, 10);
         const [user] = await pool.query(
            `UPDATE usuarios SET password = IFNULL(?,password) WHERE user_id = ?`,
            [newPasswordHash, id]
         );

         return user;
      } catch (error) {
         return error;
      }
   }
}
