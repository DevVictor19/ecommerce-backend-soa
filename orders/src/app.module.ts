import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { CartsModule } from './core/carts/carts.module';
import { OrdersModule } from './core/orders/orders.module';
import { DatabaseModule } from './infra/database/database.module';
import { EnvConfigModule } from './infra/env-config/env-config.module';

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
