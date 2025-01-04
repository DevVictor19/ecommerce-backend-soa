import { Module } from '@nestjs/common';

import { PaymentStatusEventQueueServiceImpl } from './services/implementations/payment-status-event-queue.service';
import { PaymentsQueueServiceImpl } from './services/implementations/payments-queue.service';
import { RabbitMQServiceImpl } from './services/implementations/rabbitmq.service';
import { PaymentStatusEventQueueService } from './services/payment-status-event-queue-service.interface';
import { PaymentsQueueService } from './services/payments-queue-service.interface';
import { RabbitMQService } from './services/rabbitmq-service.interface';

@Module({
  providers: [
    { provide: RabbitMQService, useClass: RabbitMQServiceImpl },
    {
      provide: PaymentStatusEventQueueService,
      useClass: PaymentStatusEventQueueServiceImpl,
    },
    { provide: PaymentsQueueService, useClass: PaymentsQueueServiceImpl },
  ],
  exports: [PaymentStatusEventQueueService, PaymentsQueueService],
})
export class RabbitMQModule {}
