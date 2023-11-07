import { UbicacionesModel } from '../models/ubicaciones-models.js';

export const getAllUbicaciones = async (req, res) => {
   try {
      const result = await UbicacionesModel.getAllUbicaciones();
      if (result.length === 0)
         return res
            .status(404)
            .json({ message: 'No se encontraron resultados' });
      return res.status(200).json({ result });
   } catch (error) {
      return res.status(500).json({ message: 'error en el servidor' });
   }
};
export const createUbicacion = async (req, res) => {
   const { ubicacion } = req.body;
   try {
      const result = await UbicacionesModel.createUbicacion({
         ubicacion,
      });
      if (!!result.code) {
         return res.status(400).json({ message: result.sqlMessage });
      }
      return res.status(200).json({
         message: 'ubicacion creada',
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};
export const updateUbicacion = async (req, res) => {
   const { id } = req.params;
   const { ubicacion } = req.body;
   try {
      const result = await UbicacionesModel.updateUbicacion({
         id,
         data: {
            ubicacion,
         },
      });
      if (result.affectedRows === 0) {
         return res
            .status(400)
            .json({ message: 'no se encontro la ubicacion' });
      }
      return res.status(200).json({
         message: 'ubicacion actualizada',
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};
export const deleteUbicacion = async (req, res) => {
   const { id } = req.params;
   try {
      const result = await UbicacionesModel.deleteUbicacion({ id });
      if (result.affectedRows === 0) {
         return res
            .status(400)
            .json({ message: 'no se encontro la ubicacion' });
      }
      return res.status(200).json({
         message: 'ubicacion eliminada',
      });
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};
