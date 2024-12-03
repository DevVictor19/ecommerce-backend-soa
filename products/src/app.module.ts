import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { DatabaseModule } from './database/database.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    DatabaseModule,
    EnvConfigModule,
    LoggerModule.forRoot(),
    ProductsModule,
  ],
})
export class AppModule {}
