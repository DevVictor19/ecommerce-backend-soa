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

  async emitPaymentFailedEvent(event: PaymentFailedEvent): Promise<void> {
    await this.rabbitMQService.publishToDirectExchange(
      this.exchange,
      'payment-failed',
      event,
    );
  }

  async emitPaymentMadeEvent(event: PaymentMadeEvent): Promise<void> {
    await this.rabbitMQService.publishToDirectExchange(
      this.exchange,
      'payment-made',
      event,
    );
  }
}
