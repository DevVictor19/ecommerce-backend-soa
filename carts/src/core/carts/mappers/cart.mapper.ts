import { CartDto } from '../dtos/cart.dto';
import { Cart } from '../entities/cart.entity';
import { CartProductMapper } from './cart-product.mapper';

export class CartMapper {
  static toDto(entity: Cart): CartDto {
    const dto = new CartDto();
    dto.id = entity._id;
    dto.products = entity.products.map(CartProductMapper.toDto);
    dto.productsQuantity = entity.productsQuantity;
    dto.totalPrice = entity.totalPrice;
    dto.createdAt = entity.createdAt.toISOString();
    return dto;
  }
}
