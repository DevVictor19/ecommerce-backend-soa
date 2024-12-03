import { CartProductDto } from '../dtos/cart-product.dto';
import { CartProduct } from '../entities/cart-product.entity';

export class CartProductMapper {
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
