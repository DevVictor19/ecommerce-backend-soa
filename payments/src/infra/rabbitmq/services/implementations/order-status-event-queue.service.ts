import { Injectable } from '@nestjs/common';

import {
  OrderPaymentFailedEvent,
  OrderPaymentSucceedEvent,
  OrderStatusEventQueueService,
} from '../order-status-event-queue-service.interface';
import { RabbitMQService } from '../rabbitmq-service.interface';

@Injectable()
export class OrderStatusEventQueueServiceImpl
  implements OrderStatusEventQueueService
{
  private readonly ORDER_EXCHANGE = 'order-status';

  private readonly ORDER_STATUS_EVENT_TYPE = {
    PAYMENT_FAILED: 'order-payment-failed',
    PAYMENT_SUCCEED: 'order-payment-succeed',
    ORDER_CREATED: 'order-created',
  } as const;

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async emitPaymentFailedEvent(event: OrderPaymentFailedEvent): Promise<void> {
    await this.rabbitMQService.publishToDirectExchange(
      this.ORDER_EXCHANGE,
      this.ORDER_STATUS_EVENT_TYPE.PAYMENT_FAILED,
      event,
    );
  }

  async emitPaymentSucceedEvent(
    event: OrderPaymentSucceedEvent,
  ): Promise<void> {
    await this.rabbitMQService.publishToDirectExchange(
      this.ORDER_EXCHANGE,
      this.ORDER_STATUS_EVENT_TYPE.PAYMENT_SUCCEED,
      event,
    );
  }
}
