import { Injectable } from '@nestjs/common';

import { SortOrder } from '@/@types/pagination';

import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product-service.interface';

@Injectable()
export class FindAllProductsUseCase {
  constructor(private readonly productService: ProductService) {}

  async execute(
    page: number,
    size: number,
    sort: SortOrder,
    sortBy: keyof Product,
    name?: string,
  ) {
    return this.productService.findAllPaginated({
      page,
      size,
      sort,
      sortBy,
      name,
    });
  }
}
