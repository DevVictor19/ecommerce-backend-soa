import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { ProductService } from '@/core/products/services/product-service.interface';
import {
  OrderPaymentFailedEvent,
  OrderPaymentSucceedEvent,
  OrderStatusEventQueueService,
} from '@/infra/rabbitmq/services/order-status-event-queue-service.interface';
import {
  PaymentsQueueMessage,
  PaymentsQueueService,
} from '@/infra/rabbitmq/services/payments-queue-service.interface';

import { PaymentService } from '../services/payment-service.interface';

@Injectable()
export class PayOrderWithCreditCardUseCase implements OnModuleInit {
  private readonly logger = new Logger(PayOrderWithCreditCardUseCase.name);

  constructor(
    private readonly paymentService: PaymentService,
    private readonly productService: ProductService,
    private readonly orderStatusEventQueueService: OrderStatusEventQueueService,
    private readonly paymentsQueueService: PaymentsQueueService,
  ) {}

  async onModuleInit() {
    await this.paymentsQueueService.consume(this.execute.bind(this));
    this.logger.log('Listening messages from payments-queue');
  }

  private async execute(message: PaymentsQueueMessage) {
    this.logger.log('Consuming message from payments-queue');

    try {
      const charge = await this.processCharge(message);

      await this.orderStatusEventQueueService.emitPaymentSucceedEvent(
        this.prepareOrderPaymentSucceedEvent(message, charge.id),
      );
    } catch {
      await this.orderStatusEventQueueService.emitPaymentFailedEvent(
        this.prepareOrderPaymentFailedEvent(message),
      );
    }
  }

  private async processCharge(message: PaymentsQueueMessage) {
    let customer = await this.paymentService.findCustomerByDocument(
      message.payment.document,
    );

    if (!customer) {
      customer = await this.paymentService.createCustomer(
        message.user.name,
        message.user.email,
        message.payment.document,
      );
    }

    await this.productService.checkStockAvailability(message.order.products);

    return this.paymentService.createCreditCardCharge(
      customer.id,
      message.user.remoteIp,
      message.order.price,
      message.payment.parcels,
      message.payment.card,
    );
  }

  private prepareOrderPaymentSucceedEvent(
    message: PaymentsQueueMessage,
    transactionCode: string,
  ): OrderPaymentSucceedEvent {
    return {
      order: {
        id: message.order.id,
        price: message.order.price,
        products: message.order.products,
      },
      payment: {
        method: message.payment.method,
        parcels: message.payment.parcels,
        transactionCode,
      },
      user: {
        email: message.user.email,
        id: message.user.id,
        name: message.user.name,
      },
    };
  }

  private prepareOrderPaymentFailedEvent(
    message: PaymentsQueueMessage,
  ): OrderPaymentFailedEvent {
    return {
      order: {
        id: message.order.id,
        price: message.order.price,
        products: message.order.products,
      },
      payment: {
        method: message.payment.method,
        parcels: message.payment.parcels,
        transactionCode: null,
      },
      user: {
        email: message.user.email,
        id: message.user.id,
        name: message.user.name,
      },
    };
  }
}
