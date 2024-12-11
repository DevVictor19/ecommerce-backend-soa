import { CartProduct } from '../entities/cart-product.entity';
import { OrderCart } from '../entities/order-cart.entity';

export class OrderCartFactory {
  static create(
    id: string,
    products: CartProduct[],
    productsQuantity: number,
    totalPrice: number,
    createdAt: Date,
  ): OrderCart {
    const entity = new OrderCart();

    entity._id = id;
    entity.createdAt = createdAt;
    entity.products = products;
    entity.productsQuantity = productsQuantity;
    entity.totalPrice = totalPrice;

    return entity;
  }
}
