import { Module } from '@nestjs/common';

import { PaymentStatusEventQueueServiceImpl } from './services/implementations/payment-status-event-queue.service';
import { RabbitMQServiceImpl } from './services/implementations/rabbitmq.service';
import { PaymentStatusEventQueueService } from './services/payment-status-event-queue-service.interface';
import { RabbitMQService } from './services/rabbitmq-service.interface';

@Module({
  providers: [
    { provide: RabbitMQService, useClass: RabbitMQServiceImpl },
    {
      provide: PaymentStatusEventQueueService,
      useClass: PaymentStatusEventQueueServiceImpl,
    },
  ],
  exports: [PaymentStatusEventQueueService],
})
export class RabbitMQModule {}
