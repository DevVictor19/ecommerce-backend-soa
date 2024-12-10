import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { CartsModule } from './carts/carts.module';
import { DatabaseModule } from './database/database.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    DatabaseModule,
    EnvConfigModule,
    LoggerModule.forRoot(),
    OrdersModule,
    CartsModule,
  ],
})
export class AppModule {}
