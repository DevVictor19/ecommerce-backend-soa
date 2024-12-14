import { Module } from '@nestjs/common';

import { PaymentsQueueServiceImpl } from './services/implementations/payments-queue.service';
import { RabbitMQServiceImpl } from './services/implementations/rabbitmq.service';
import { PaymentsQueueService } from './services/payments-queue-service.interface';
import { RabbitMQService } from './services/rabbitmq-service.interface';

@Module({
  providers: [
    { provide: RabbitMQService, useClass: RabbitMQServiceImpl },
    { provide: PaymentsQueueService, useClass: PaymentsQueueServiceImpl },
  ],
  exports: [PaymentsQueueService],
})
export class RabbitMQModule {}
