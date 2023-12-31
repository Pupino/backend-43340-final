import { entorno } from '../config.js';

let cartsPersist;
let productsPersist;
let recoverPersist;
let usersPersist;

switch (entorno.PERSISTENCE) {
  case 'MONGO':
    //Carts
    const { default: CartModelMongo } = await import('./mongo/carts.mongo.js');
    cartsPersist = CartModelMongo;
    //Products
    const { default: ProductModelMongo } = await import(
      './mongo/products.mongo.js'
    );
    productsPersist = ProductModelMongo;
    //Recovers
    const { default: RecoverModelMongo } = await import(
      './mongo/recover-codes.mongo.js'
    );
    recoverPersist = RecoverModelMongo;
    //Users
    const { default: UserModelMongo } = await import('./mongo/users.mongo.js');
    usersPersist = UserModelMongo;
    break;

  default:
    break;
}

export const cartsModel = new cartsPersist();
export const productsModel = new productsPersist();
export const recoverCodesModel = new recoverPersist();
export const usersModel = new usersPersist();
