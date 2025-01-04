import { Injectable } from '@nestjs/common';

import {
  OrderCreatedEvent,
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

  async consumePaymentFailedEvent(
    onEvent: (event: OrderPaymentFailedEvent) => void,
  ): Promise<void> {
    await this.rabbitMQService.consumeFromDirectExchange(
      this.ORDER_EXCHANGE,
      this.ORDER_STATUS_EVENT_TYPE.PAYMENT_FAILED,
      onEvent,
    );
  }

  async consumePaymentSucceedEvent(
    onEvent: (event: OrderPaymentSucceedEvent) => void,
  ): Promise<void> {
    await this.rabbitMQService.consumeFromDirectExchange(
      this.ORDER_EXCHANGE,
      this.ORDER_STATUS_EVENT_TYPE.PAYMENT_SUCCEED,
      onEvent,
    );
  }

  async consumeOrderCreatedEvent(
    onEvent: (event: OrderCreatedEvent) => void,
  ): Promise<void> {
    await this.rabbitMQService.consumeFromDirectExchange(
      this.ORDER_EXCHANGE,
      this.ORDER_STATUS_EVENT_TYPE.ORDER_CREATED,
      onEvent,
    );
  }
}
