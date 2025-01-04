import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';

import {
  OrderPaymentFailedEvent,
  OrderStatusEventQueueService,
} from '@/infra/rabbitmq/services/order-status-event-queue-service.interface';

import { ORDER_STATUS } from '../enums/order-status.enum';
import { OrderService } from '../services/order-service.interface';

@Injectable()
export class UpdateOrderAfterUnsuccessfulPaymentUseCase
  implements OnModuleInit
{
  private readonly logger = new Logger(
    UpdateOrderAfterUnsuccessfulPaymentUseCase.name,
  );

  constructor(
    private readonly orderService: OrderService,
    private readonly orderStatusEventQueueService: OrderStatusEventQueueService,
  ) {}

  async onModuleInit() {
    await this.orderStatusEventQueueService.consumePaymentFailedEvent(
      this.execute.bind(this),
    );
    this.logger.log('Listening to order-payment-failed events...');
  }

  private async execute(event: OrderPaymentFailedEvent) {
    this.logger.log('Processing order-payment-failed event');

    const order = await this.orderService.findById(event.order.id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = ORDER_STATUS.WAITING_PAYMENT;

    await this.orderService.update(order);
  }
}
