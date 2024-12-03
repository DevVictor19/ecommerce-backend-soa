import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CartProductDto } from '../dtos/cart-product.dto';
import { ProductService } from '../services/product-service.interface';

@Injectable()
export class SubtractProductsFromStockUseCase {
  constructor(private readonly productService: ProductService) {}

  async execute(products: CartProductDto[]) {
    if (products.length > 30) {
      throw new BadRequestException(
        'Cannot process more than 30 products for stock subtraction',
      );
    }

    const promises: Promise<void>[] = products.map(async (cartProduct) => {
      const stockProduct = await this.productService.findById(cartProduct.id);

      if (!stockProduct) {
        throw new NotFoundException(
          `Product with ID ${cartProduct.id} not found`,
        );
      }

      if (stockProduct.stockQuantity < cartProduct.inCartQuantity) {
        throw new BadRequestException(
          `Insufficient stock for product ID ${cartProduct.id}, available: ${stockProduct.stockQuantity}, Requested: ${cartProduct.inCartQuantity}`,
        );
      }

      stockProduct.stockQuantity -= cartProduct.inCartQuantity;

      await this.productService.update(stockProduct._id, {
        stockQuantity: stockProduct.stockQuantity,
      });
    });

    await Promise.all(promises);
  }
}