import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';

import {
  PaymentFailedEvent,
  PaymentStatusEventQueueService,
} from '@/infra/rabbitmq/services/payment-status-event-queue-service.interface';

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
    private readonly paymentStatusEventQueueService: PaymentStatusEventQueueService,
  ) {}

  async onModuleInit() {
    await this.paymentStatusEventQueueService.consumePaymentFailedEvent(
      this.execute.bind(this),
    );
    this.logger.log('Listening to PAYMENT_FAILED events...');
  }

  private async execute(event: PaymentFailedEvent) {
    this.logger.log('Processing PAYMENT_FAILED event');

    const order = await this.orderService.findById(event.order.id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = ORDER_STATUS.WAITING_PAYMENT;

    await this.orderService.update(order);
  }
}
