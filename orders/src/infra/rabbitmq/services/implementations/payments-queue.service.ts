import { Injectable } from '@nestjs/common';

import {
  PaymentsQueueMessage,
  PaymentsQueueService,
} from '../payments-queue-service.interface';
import { RabbitMQService } from '../rabbitmq-service.interface';

@Injectable()
export class PaymentsQueueServiceImpl implements PaymentsQueueService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async publish(message: PaymentsQueueMessage): Promise<void> {
    await this.rabbitMQService.publish('payments-queue', message);
  }
}
