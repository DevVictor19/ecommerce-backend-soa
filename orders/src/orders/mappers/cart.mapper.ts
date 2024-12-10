import { CartDto } from '@/carts/dtos/cart.dto';

import { OrderCart } from '../entities/order-cart.entity';
import { CartProductMapper } from './cart-product.mapper';

export class CartMapper {
  static toEntity(dto: CartDto): OrderCart {
    const entity = new OrderCart();
    entity._id = dto.id;
    entity.createdAt = new Date(dto.createdAt);
    entity.products = dto.products.map(CartProductMapper.toEntity);
    entity.productsQuantity = dto.productsQuantity;
    entity.totalPrice = dto.totalPrice;
    return entity;
  }
}
