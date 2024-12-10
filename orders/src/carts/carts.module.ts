import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EnvConfigService } from '@/env-config/services/env-config-service.interface';

import { CartService } from './services/cart-service.interface';
import { CartServiceImpl } from './services/implementations/cart.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (envConfigService: EnvConfigService) => ({
        timeout: 5000,
        maxRedirects: 3,
        baseURL: envConfigService.getCartServiceUrl(),
      }),
      inject: [EnvConfigService],
    }),
  ],
  providers: [{ provide: CartService, useClass: CartServiceImpl }],
  exports: [CartService],
})
export class CartsModule {}
