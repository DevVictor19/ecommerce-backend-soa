import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EnvConfigService } from '@/infra/env-config/services/env-config-service.interface';

import { ProductServiceImpl } from './services/implementations/product.service';
import { ProductService } from './services/product-service.interface';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (envConfigService: EnvConfigService) => ({
        timeout: 5000,
        maxRedirects: 3,
        baseURL: envConfigService.getProductServiceUrl(),
      }),
      inject: [EnvConfigService],
    }),
  ],
  providers: [{ provide: ProductService, useClass: ProductServiceImpl }],
  exports: [ProductService],
})
export class ProductsModule {}
