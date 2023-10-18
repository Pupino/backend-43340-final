import { Router } from 'express';
import { isUser, isAdmin, isPremiumOrAdmin } from '../middlewares/auth.js';
import { productController } from '../controllers/products.controller.js';
import { generateProduct } from '../Utils/generateData.js';
import CustomError from '../services/errors/custom-error.js';
import EErros from '../services/errors/enum.js';
export const productsRouter = Router();
import { logger } from '../Utils/logger.js';
//Ejemplo: http://localhost:8080/api/products/?page=1&limit=5&sort=asc&query=PAQ
productsRouter.get('/', isUser, productController.getProducts);
productsRouter.post('/', isPremiumOrAdmin, productController.postProduct);
productsRouter.get(
  '/create',
  isPremiumOrAdmin,
  productController.createProductForm
);
productsRouter.get('/:pid', isUser, productController.getProductById);
productsRouter.put('/:pid', isPremiumOrAdmin, productController.updateProduct);
productsRouter.delete(
  '/:pid',
  isPremiumOrAdmin,
  productController.deleteProduct
);
productsRouter.get('/faker/mockingproducts', async (req, res) => {
  try {
    const products = [];
    for (let i = 0; i < 100; i++) {
      products.push(generateProduct());
    }
    const user = '';
    res.send({ status: 'success', payload: products });
  } catch (e) {
    logger.error(`productsRouter.mockingproducts: ${JSON.stringify(e.cause)}`);
    CustomError.createError({
      name: 'Mocking creation error',
      cause: 'Contact Development team',
      message: e,
      code: EErros.FAKER_ERROR,
    });
  }
});
productsRouter.post(
  '/manyProducts',
  isPremiumOrAdmin,
  productController.postManyProduct
);
