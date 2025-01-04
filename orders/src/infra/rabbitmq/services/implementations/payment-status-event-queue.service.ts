import { Injectable } from '@nestjs/common';

import {
  PaymentFailedEvent,
  PaymentMadeEvent,
  PaymentStatusEventQueueService,
} from '../payment-status-event-queue-service.interface';
import { RabbitMQService } from '../rabbitmq-service.interface';

@Injectable()
export class PaymentStatusEventQueueServiceImpl
  implements PaymentStatusEventQueueService
{
  private readonly exchange = 'payment-status';

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async consumePaymentFailedEvent(
    onEvent: (event: PaymentFailedEvent) => void,
  ): Promise<void> {
    await this.rabbitMQService.consumeFromDirectExchange(
      this.exchange,
      'payment-failed',
      onEvent,
    );
  }

  async consumePaymentMadeEvent(
    onEvent: (event: PaymentMadeEvent) => void,
  ): Promise<void> {
    await this.rabbitMQService.consumeFromDirectExchange(
      this.exchange,
      'payment-made',
      onEvent,
    );
  }
}
