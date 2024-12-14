import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { ProductService } from '@/core/products/services/product-service.interface';
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
    private readonly paymentsQueueService: PaymentsQueueService,
  ) {}

  async onModuleInit() {
    await this.paymentsQueueService.consume(this.execute.bind(this));
    this.logger.log('Listening messages from payments-queue');
  }

  private async execute(message: PaymentsQueueMessage) {
    this.logger.log('Consuming message from payments-queue');

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

    const charge = await this.paymentService.createCreditCardCharge(
      customer.id,
      message.user.remoteIp,
      message.order.price,
      message.payment.parcels,
      message.payment.card,
    );

    console.log(charge);
  }
}
