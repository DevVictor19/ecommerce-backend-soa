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
}
