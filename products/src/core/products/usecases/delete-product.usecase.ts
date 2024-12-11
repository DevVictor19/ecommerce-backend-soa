import { Injectable } from '@nestjs/common';

import { ProductService } from '../services/product-service.interface';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productService: ProductService) {}

  async execute(productId: string) {
    await this.productService.delete(productId);
  }
}
