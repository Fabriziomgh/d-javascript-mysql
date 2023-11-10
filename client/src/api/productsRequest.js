import axios from 'axios';
const PORT = 4000;
const productsRequest = axios.create({
   baseURL: `http://localhost:${PORT}/api/products`,
   withCredentials: true,
});
export const getResources = () => productsRequest.get('/resource');
export const getAllProductsRequest = () => productsRequest.get('/');
export const createProductRequest = (product) =>
   productsRequest.post('/', product);
