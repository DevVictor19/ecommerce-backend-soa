import { Injectable } from '@nestjs/common';

import {
  PaymentsQueueMessage,
  PaymentsQueueService,
} from '../payments-queue-service.interface';
import { RabbitMQService } from '../rabbitmq-service.interface';

@Injectable()
export class PaymentsQueueServiceImpl implements PaymentsQueueService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async consume(onMessage: (msg: PaymentsQueueMessage) => void): Promise<void> {
    await this.rabbitMQService.consume('payments-queue', onMessage);
  }
}
