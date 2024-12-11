import { randomUUID } from 'node:crypto';

import { Cart } from '../entities/cart.entity';

export class CartFactory {
  static create(userId: string) {
    const entity = new Cart();

    entity._id = randomUUID();
    entity.createdAt = new Date();
    entity.products = [];
    entity.productsQuantity = 0;
    entity.totalPrice = 0;
    entity.userId = userId;

    return entity;
  }
}
