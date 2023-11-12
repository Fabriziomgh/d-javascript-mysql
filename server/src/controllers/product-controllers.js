import { ProductsModel } from '../models/product-models.js';

export const getResources = async (req, res) => {
   try {
      const resources = await ProductsModel.getResources();
      return res.status(200).json(resources);
   } catch (error) {
      return res.status(500).json({
         message: 'Error de servidor',
      });
   }
};
export const getAllProducts = async (req, res) => {
   try {
      const products = await ProductsModel.getAllProducts();

      if (products.length === 0)
         return res.status(404).json({
            message: 'No se encontraron resultados',
         });

      return res.status(200).json({
         products,
      });
   } catch (error) {
      return res.status(500).json({
         message: 'Error de servidor',
      });
   }
};

export const getProduct = async (req, res) => {
   const { id } = req.params;
   try {
      const product = await ProductsModel.getProduct({ id });
      if (product.length === 0)
         return res.status(404).json({
            message: 'No se encontraron resultados',
         });
      return res.status(200).json({
         product,
      });
   } catch (error) {
      return res.status(500).json({
         message: 'Error de servidor',
      });
   }
};
export const createProduct = async (req, res) => {
   try {
      const product = await ProductsModel.createProduct({ data: req.body });
      if (!!product.code)
         return res.status(400).json({
            message: `No se pudo crear el producto. ERROR: ${product.sqlMessage}`,
         });

      return res.status(201).json({
         message: 'producto creado',
      });
   } catch (error) {
      return res.status(500).json({
         message: 'Error en el servidor',
      });
   }
};
export const updateProduct = async (req, res) => {
   const { id } = req.params;
   try {
      const result = await ProductsModel.updateProduct({
         data: req.body,
         id,
      });
      console.log(result);
      if (result.affectedRows === 0)
         return res.status(404).json({
            message: 'No se encontro el producto',
         });
      return res.status(200).json({
         message: 'producto actualizado',
      });
   } catch (error) {
      return res.status(500).json({
         message: 'Error en el servidor',
      });
   }
};
export const deleteProduct = async (req, res) => {
   const { id } = req.params;
   try {
      const product = await ProductsModel.deleteProduct({ id });
      console.log(product);
      if (product.affectedRows === 0)
         return res.status(404).json({
            message: 'No se encontro el producto',
         });
      res.sendStatus(204);
   } catch (error) {
      return res.status(500).json({
         message: 'Error en el servidor',
      });
   }
};
