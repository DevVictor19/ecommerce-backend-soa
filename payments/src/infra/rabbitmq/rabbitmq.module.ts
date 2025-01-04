import { Module } from '@nestjs/common';

import { OrderStatusEventQueueServiceImpl } from './services/implementations/order-status-event-queue.service';
import { PaymentsQueueServiceImpl } from './services/implementations/payments-queue.service';
import { RabbitMQServiceImpl } from './services/implementations/rabbitmq.service';
import { OrderStatusEventQueueService } from './services/order-status-event-queue-service.interface';
import { PaymentsQueueService } from './services/payments-queue-service.interface';
import { RabbitMQService } from './services/rabbitmq-service.interface';

@Module({
  providers: [
    { provide: RabbitMQService, useClass: RabbitMQServiceImpl },
    {
      provide: OrderStatusEventQueueService,
      useClass: OrderStatusEventQueueServiceImpl,
    },
    { provide: PaymentsQueueService, useClass: PaymentsQueueServiceImpl },
  ],
  exports: [OrderStatusEventQueueService, PaymentsQueueService],
})
export class RabbitMQModule {}
