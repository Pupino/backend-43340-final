import { Router } from 'express';
import { cartsController } from '../controllers/carts.controller.js';
import { isUser, isAdmin } from '../middlewares/auth.js';

export const routerCarts = Router();

routerCarts.get('/', cartsController.getAll);
routerCarts.post('/', isUser, cartsController.createEmptyCart);
routerCarts.get('/:cid', isUser, cartsController.getById);
routerCarts.delete('/:cid', isUser, cartsController.cleanCart);
routerCarts.put('/:cid', isUser, cartsController.updateProductsCart);
routerCarts.put(
  '/:cid/products/:pid',
  isAdmin,
  cartsController.updateProdQtyOnCart
);
routerCarts.delete(
  '/:cid/products/:pid',
  isAdmin,
  cartsController.removeProdFromCart
);
routerCarts.post('/:cid/purchase', isUser, cartsController.purchase);
