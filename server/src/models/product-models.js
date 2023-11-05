import pool from '../database.js';

export class ProductsModel {
   static async getAllProducts({ limit, offset }) {
      try {
         const [result] = await pool.query(
            `SELECT p.producto_id, p.producto, p.descripcion, p.serial, u.ubicacion FROM productos p
            JOIN ubicaciones u ON p.id_ubicacion = u.id_ubicacion 
            LIMIT ? OFFSET ?`,
            [limit, offset]
         );
         console.log(result);
         return result;
      } catch (error) {
         return error;
      }
   }
   static async getProductBySearch({ search }) {
      try {
         const [result] = await pool.query(
            `SELECT p.producto_id, p.producto,p.descripcion,p.serial,p.fecha_creacion, u.ubicacion  
            FROM productos p  
            JOIN ubicaciones u ON p.id_ubicacion = u.id_ubicacion
            WHERE p.serial = ?`,
            [search]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
   static async getProduct({ id }) {
      try {
         const [result] = await pool.query(
            `SELECT p.producto_id, p.producto,p.descripcion,p.serial,p.fecha_creacion, u.ubicacion  
            FROM productos p  
            JOIN ubicaciones u ON p.id_ubicacion = u.id_ubicacion
            WHERE p.producto_id = ?`,
            [id]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
   static async createProduct({ data }) {
      const { producto, descripcion, serial, id_ubicacion } = data;
      try {
         const result = await pool.query(
            `INSERT INTO productos (producto,descripcion,serial,id_ubicacion) VALUES (?,?,?,?)`,
            [producto, descripcion, serial, id_ubicacion]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
   static async updateProduct({ id, data }) {
      const { producto, descripcion, serial, id_ubicacion } = data;
      try {
         const [result] = await pool.query(
            `UPDATE productos
         SET producto = IFNULL(?, producto),
             descripcion = IFNULL(?, descripcion),
             serial = IFNULL(?, serial),
             id_ubicacion = IFNULL(?, id_ubicacion)
         WHERE producto_id = ?`,
            [producto, descripcion, serial, id_ubicacion, id]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
   static async deleteProduct({ id }) {
      try {
         const [result] = await pool.query(
            `DELETE FROM productos WHERE producto_id = ?`,
            [id]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
}