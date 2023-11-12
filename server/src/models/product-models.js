import pool from '../database.js';

export class ProductsModel {
   static async getAllProducts() {
      try {
         const [result] = await pool.query(
            `SELECT p.producto_id,p.cantidad, p.producto,p.fecha_creacion, p.descripcion, p.serial, u.ubicacion FROM productos p
            JOIN ubicaciones u ON p.id_ubicacion = u.id_ubicacion 
            `
         );
         return result;
      } catch (error) {
         return error;
      }
   }
   static async getProduct({ id }) {
      try {
         const [result] = await pool.query(
            `SELECT *  
            FROM productos 
            WHERE producto_id = ?`,
            [id]
         );
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

   static async createProduct({ data }) {
      const { producto, cantidad, descripcion, serial, id_ubicacion } = data;
      try {
         const result = await pool.query(
            `INSERT INTO productos (producto,cantidad,descripcion,serial,id_ubicacion) VALUES (?,?,?,?,?)`,
            [producto, cantidad, descripcion, serial, id_ubicacion]
         );
         return result;
      } catch (error) {
         return error;
      }
   }
   static async updateProduct({ id, data }) {
      const { producto, cantidad, descripcion, serial, id_ubicacion } = data;
      try {
         const [result] = await pool.query(
            `UPDATE productos
         SET producto = IFNULL(?, producto),
         cantidad = IFNULL(?, cantidad),
             descripcion = IFNULL(?, descripcion),
             serial = IFNULL(?, serial),
             id_ubicacion = IFNULL(?, id_ubicacion)
         WHERE producto_id = ?`,
            [producto, cantidad, descripcion, serial, id_ubicacion, id]
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
   static async getResources() {
      try {
         const [ubicaciones] = await pool.query(`select * from ubicaciones`);
         return { ubicaciones };
      } catch (error) {
         return error;
      }
   }
}
