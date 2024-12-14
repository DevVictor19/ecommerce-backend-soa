import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { PaymentsModule } from './core/payments/payments.module';
import { ProductsModule } from './core/products/products.module';
import { EnvConfigModule } from './infra/env-config/env-config.module';
import { RabbitMQModule } from './infra/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    EnvConfigModule,
    LoggerModule.forRoot(),
    RabbitMQModule,
    PaymentsModule,
    ProductsModule,
  ],
})
export class AppModule {}
