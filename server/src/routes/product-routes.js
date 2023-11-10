import { Router } from 'express';
import {
   createProduct,
   deleteProduct,
   getAllProducts,
   getProduct,
   getResources,
   updateProduct,
} from '../controllers/product-controllers.js';
import { productSchema } from '../schemas/product-schemas.js';
import { validateSchema } from '../middlewares/validate-schema.js';
import { authVerify } from '../middlewares/auth-verify.js';

const productsRouter = Router();

productsRouter.get('/resource', getResources);
productsRouter.get('/', authVerify, getAllProducts);
productsRouter.get('/:id', authVerify, getProduct);
productsRouter.post(
   '/',
   authVerify,
   validateSchema(productSchema),
   createProduct
);
productsRouter.patch(
   '/:id',
   authVerify,
   validateSchema(productSchema.partial()),
   updateProduct
);
productsRouter.delete('/:id', authVerify, deleteProduct);

export default productsRouter;
