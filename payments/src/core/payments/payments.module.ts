import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EnvConfigService } from '@/infra/env-config/services/env-config-service.interface';
import { RabbitMQModule } from '@/infra/rabbitmq/rabbitmq.module';

import { ProductsModule } from '../products/products.module';
import { PaymentServiceImpl } from './services/implementations/payment.service';
import { PaymentService } from './services/payment-service.interface';
import { PayOrderWithCreditCardUseCase } from './usecases/pay-order-with-credit-card.usecase';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (envConfigService: EnvConfigService) => ({
        timeout: 5000,
        maxRedirects: 3,
        baseURL: envConfigService.getPaymentGatewayUrl(),
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `nestjs api`,
          access_token: envConfigService.getPaymentGatewayKey(),
        },
      }),
      inject: [EnvConfigService],
    }),
    RabbitMQModule,
    ProductsModule,
  ],
  providers: [
    { provide: PaymentService, useClass: PaymentServiceImpl },
    PayOrderWithCreditCardUseCase,
  ],
})
export class PaymentsModule {}
