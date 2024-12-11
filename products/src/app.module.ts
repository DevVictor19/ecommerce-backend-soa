import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { ProductsModule } from './core/products/products.module';
import { DatabaseModule } from './infra/database/database.module';
import { EnvConfigModule } from './infra/env-config/env-config.module';

@Module({
  imports: [
    DatabaseModule,
    EnvConfigModule,
    LoggerModule.forRoot(),
    ProductsModule,
  ],
})
export class AppModule {}
