import pool from '../database.js';

export class UbicacionesModel {
   static async getAllUbicaciones() {
      try {
         const [result] = await pool.query(`SELECT * FROM ubicaciones`);
         return result;
      } catch (error) {
         return error;
      }
   }
   static async createUbicacion({ ubicacion }) {
      try {
         const [result] = await pool.query(
            'insert into ubicaciones (ubicacion) values (?)',
            [ubicacion]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
   static async updateUbicacion({ id, data }) {
      const { ubicacion } = data;
      try {
         const result = await pool.query(
            'update ubicaciones set ubicacion = ? where id_ubicacion = ?',
            [ubicacion, id]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
   static async deleteUbicacion({ id }) {
      try {
         const [result] = await pool.query(
            'delete from ubicaciones where id_ubicacion = ?',
            [id]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
}
