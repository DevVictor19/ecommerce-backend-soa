import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

import { CartProductDto, ProductService } from '../product-service.interface';

@Injectable()
export class ProductServiceImpl implements ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly httpService: HttpService) {}

  async checkStockAvailability(products: CartProductDto[]): Promise<void> {
    await this.httpService.axiosRef.post('/products/availability', {
      products,
    });
  }
}
