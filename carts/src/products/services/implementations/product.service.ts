import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { ProductDto, ProductService } from '../product-service.interface';

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(private readonly httpService: HttpService) {}

  async findById(productId: string): Promise<ProductDto> {
    const { data } = await this.httpService.axiosRef.get(
      `/products/${productId}`,
    );

    return data;
  }
}
