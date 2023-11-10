import { createContext, useState, useEffect } from 'react';
import {
   createProductRequest,
   getAllProductsRequest,
   getResources,
} from '../api/productsRequest';
export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
   const [products, setProducts] = useState([]);
   const [ubicaciones, setUbicaciones] = useState([]);
   const getAllProducts = async () => {
      try {
         const products = await getAllProductsRequest();
         setProducts(products.data);
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
      try {
         const response = await createProductRequest(product);
         if (response.status === 200) console.log('producto creado');
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProducts();
      getAllResources();
   }, []);
   return (
      <ProductsContext.Provider
         value={{ products, ubicaciones, getAllProducts, createProduct }}
      >
         {children}
      </ProductsContext.Provider>
   );
};
