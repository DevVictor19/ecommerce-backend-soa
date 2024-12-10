import { CartProductDto } from '@/carts/dtos/cart-product.dto';

import { CartProduct } from '../entities/cart-product.entity';

export class CartProductMapper {
  static toEntity(dto: CartProductDto): CartProduct {
    const entity = new CartProduct();
    entity._id = dto.id;
    entity.description = dto.description;
    entity.inCartQuantity = dto.inCartQuantity;
    entity.name = dto.name;
    entity.photoUrl = dto.photoUrl;
    entity.price = dto.price;
    return entity;
  }

  static toDto(entity: CartProduct): CartProductDto {
    const dto = new CartProductDto();
    dto.id = entity._id;
    dto.price = entity.price;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.photoUrl = entity.photoUrl;
    dto.inCartQuantity = entity.inCartQuantity;
    return dto;
  }
}
