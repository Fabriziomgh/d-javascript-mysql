import { createContext, useState, useEffect } from 'react';
import {
   createProductRequest,
   deleteProductRequest,
   getAllProductsRequest,
   updateProductRequest,
   getResources,
   getProductRequest,
} from '../api/productsRequest';
export const ProductsContext = createContext();
import { ToastDelete, ToastMessage } from '../alerts/alerts';
export const ProductsProvider = ({ children }) => {
   const [products, setProducts] = useState([]);
   const [ubicaciones, setUbicaciones] = useState([]);
   const [loading, setLoading] = useState(true);
   const getAllProducts = async () => {
      try {
         const products = await getAllProductsRequest();
         setProducts(products.data);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };
   const getProduct = async (id) => {
      try {
         const product = await getProductRequest(id);
         return product.data;
      } catch (error) {
         console.log(error);
      }
   };
   const getAllResources = async () => {
      try {
         const resources = await getResources();
         setUbicaciones(resources.data);
      } catch (error) {
         console.log(error);
      }
   };
   const createProduct = async (product) => {
      const { cantidad, id_ubicacion } = product;
      try {
         const response = await createProductRequest({
            ...product,
            cantidad: Number(cantidad),
            id_ubicacion: Number(id_ubicacion),
         });
         if (response.status === 201) {
            const newProducts = products?.products?.concat(product);
            setProducts({ products: newProducts });
            ToastMessage.fire({
               icon: 'success',
               title: 'Producto añadido con exito',
            });
         }
         return response;
      } catch (error) {
         console.log(error);
         if (error.response.status === 400) {
            ToastMessage.fire({
               icon: 'error',
               title: 'Ha ocurrido un error, por favor intentelo ingresando los datos correctamente',
            });
         }
      }
   };
   const updateProduct = async (id, product) => {
      const { cantidad, id_ubicacion } = product;

      try {
         const response = await updateProductRequest(id, {
            ...product,
            cantidad: Number(cantidad),
            id_ubicacion: Number(id_ubicacion),
         });
         if (response.status === 200)
            ToastMessage.fire({
               title: 'Producto Actualizado',
               icon: 'success',
            });
      } catch (error) {
         console.log(error);
         ToastMessage.fire({
            title: 'Error al intentar actualizar',
            icon: 'error',
         });
      }
   };
   const deleteProduct = async (id) => {
      try {
         const confirmDelete = await ToastDelete.fire();
         if (!confirmDelete.isConfirmed) return;

         const response = await deleteProductRequest(id);
         if (response.status === 204) {
            const newProducts = products?.products?.filter(
               (products) => products.producto_id !== id
            );

            setProducts({ products: newProducts });
            ToastMessage.fire({
               title: 'Producto Eliminado',
               text: 'EL producto ha sido eliminado correctamente',
               icon: 'success',
            });
         }
      } catch (error) {
         console.log(error);
         ToastMessage.fire({
            title: 'Error',
            text: 'Your task not has been deleted',
            icon: 'error',
         });
      }
   };
   return (
      <ProductsContext.Provider
         value={{
            products,
            ubicaciones,
            loading,
            getAllProducts,
            createProduct,
            deleteProduct,
            getAllResources,
            updateProduct,
            getProduct,
         }}
      >
         {children}
      </ProductsContext.Provider>
   );
};
