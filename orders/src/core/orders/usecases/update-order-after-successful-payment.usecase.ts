import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';

import {
  PaymentMadeEvent,
  PaymentStatusEventQueueService,
} from '@/infra/rabbitmq/services/payment-status-event-queue-service.interface';

import { Payment } from '../entities/payment.entity';
import { ORDER_STATUS } from '../enums/order-status.enum';
import { PAYMENT_METHOD } from '../enums/payment-method.enum';
import { PaymentFactory } from '../factories/payment.factory';
import { OrderService } from '../services/order-service.interface';

@Injectable()
export class UpdateOrderAfterSuccessfulPaymentUseCase implements OnModuleInit {
  private readonly logger = new Logger(
    UpdateOrderAfterSuccessfulPaymentUseCase.name,
  );

  constructor(
    private readonly orderService: OrderService,
    private readonly paymentStatusEventQueueService: PaymentStatusEventQueueService,
  ) {}

  async onModuleInit() {
    await this.paymentStatusEventQueueService.consumePaymentMadeEvent(
      this.execute.bind(this),
    );
    this.logger.log('Listening to PAYMENT_MADE events...');
  }

  private async execute(event: PaymentMadeEvent) {
    this.logger.log('Processing PAYMENT_MADE event');

    const order = await this.orderService.findById(event.order.id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = ORDER_STATUS.PAID;

    let payment: Payment;

    if (event.payment.method === PAYMENT_METHOD.CREDIT_CARD) {
      payment = PaymentFactory.createForCreditCard(
        event.payment.transactionCode,
        event.order.price,
        event.payment.parcels,
      );
    } else if (event.payment.method === PAYMENT_METHOD.DEBIT_CARD) {
      payment = PaymentFactory.createForDebitCard(
        event.payment.transactionCode,
        event.order.price,
      );
    } else {
      throw new BadRequestException('Payment method not supported');
    }

    order.payment = payment;

    await this.orderService.update(order);
  }
}
