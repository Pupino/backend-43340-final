export default class CartDTO {
  constructor(cart) {
    this.userId = cart.userId;
    this.id = cart._id || cart.id; //this is how to handle mongoose _id or memory id
    this.productsArray = cart.productsArray;
  }
}
