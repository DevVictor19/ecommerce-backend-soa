import { CartDto } from '@/core/carts/dtos/cart.dto';

import { OrderCart } from '../entities/order-cart.entity';
import { CartProductMapper } from './cart-product.mapper';

export class OrderCartMapper {
  static toDto(entity: OrderCart): CartDto {
    const dto = new CartDto();

    dto.id = entity._id;
    dto.products = entity.products.map(CartProductMapper.toDto);
    dto.productsQuantity = entity.productsQuantity;
    dto.totalPrice = entity.totalPrice;
    dto.createdAt = entity.createdAt.toISOString();

    return dto;
  }

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
