import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductService } from '../services/product-service.interface';

@Injectable()
export class FindProductByIdUseCase {
  constructor(private readonly productService: ProductService) {}

  async execute(productId: string) {
    const product = await this.productService.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
