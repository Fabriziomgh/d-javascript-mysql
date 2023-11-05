import { Router } from 'express';
import {
   createProduct,
   deleteProduct,
   getAllProducts,
   getProduct,
   updateProduct,
} from '../controllers/product-controllers.js';
import { productSchema } from '../schemas/product-schemas.js';
import { validateSchema } from '../middlewares/validate-schema.js';

const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.get('/:id', getProduct);
productsRouter.post('/', validateSchema(productSchema), createProduct);
productsRouter.patch(
   '/:id',
   validateSchema(productSchema.partial()),
   updateProduct
);
productsRouter.delete('/:id', deleteProduct);

export default productsRouter;
