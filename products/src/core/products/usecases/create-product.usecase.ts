import { ConflictException, Injectable } from '@nestjs/common';

import { ProductService } from '../services/product-service.interface';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productService: ProductService) {}

  async execute(
    price: number,
    name: string,
    description: string,
    photoUrl: string,
    stockQuantity: number,
  ) {
    const product = await this.productService.findByName(name);

    if (product) {
      throw new ConflictException(`Product with name:${name} already exists`);
    }

    await this.productService.create(
      price,
      name,
      description,
      photoUrl,
      stockQuantity,
    );
  }
}
