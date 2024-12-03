import { CartProduct } from '../entities/cart-product.entity';

export class CartProductFactory {
  static create(
    id: string,
    price: number,
    name: string,
    description: string,
    photoUrl: string,
    inCartQuantity: number,
  ) {
    const entity = new CartProduct();

    entity._id = id;
    entity.description = description;
    entity.inCartQuantity = inCartQuantity;
    entity.name = name;
    entity.photoUrl = photoUrl;
    entity.price = price;

    return entity;
  }
}
