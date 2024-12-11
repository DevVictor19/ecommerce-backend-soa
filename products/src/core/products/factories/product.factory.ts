import { randomUUID } from 'node:crypto';

import { Product } from '../entities/product.entity';

export class ProductFactory {
  static create(
    price: number,
    name: string,
    description: string,
    photoUrl: string,
    stockQuantity: number,
  ): Product {
    const entity = new Product();
    entity._id = randomUUID();
    entity.createdAt = new Date();
    entity.description = description;
    entity.name = name;
    entity.photoUrl = photoUrl;
    entity.price = price;
    entity.stockQuantity = stockQuantity;
    return entity;
  }
}
