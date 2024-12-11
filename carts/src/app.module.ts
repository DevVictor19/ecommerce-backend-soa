import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { CartsModule } from './core/carts/carts.module';
import { ProductsModule } from './core/products/products.module';
import { DatabaseModule } from './infra/database/database.module';
import { EnvConfigModule } from './infra/env-config/env-config.module';

@Module({
  imports: [
    DatabaseModule,
    EnvConfigModule,
    LoggerModule.forRoot(),
    CartsModule,
    ProductsModule,
  ],
})
export class AppModule {}
