import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { MailService } from '@/infra/mail/services/mail-service.interface';
import {
  OrderPaymentSucceedEvent,
  OrderStatusEventQueueService,
} from '@/infra/rabbitmq/services/order-status-event-queue-service.interface';
import { TemplateEngineService } from '@/infra/template-engine/services/template-engine-service.interface';

@Injectable()
export class SendEmailAfterSuccessfulPaymentUseCase implements OnModuleInit {
  private readonly logger = new Logger(
    SendEmailAfterSuccessfulPaymentUseCase.name,
  );

  constructor(
    private readonly orderStatusEventQueueService: OrderStatusEventQueueService,
    private readonly mailService: MailService,
    private readonly templateEngineService: TemplateEngineService,
  ) {}

  async onModuleInit() {
    await this.orderStatusEventQueueService.consumePaymentSucceedEvent(
      this.execute.bind(this),
    );
    this.logger.log('Listening successful orders payment events...');
  }

  private async execute(event: OrderPaymentSucceedEvent) {
    this.logger.log('Processing successful payment order event');

    const html = await this.templateEngineService.compile(
      'order-payment-succeed.hbs',
      {
        orderId: event.order.id,
        totalPrice: (event.order.price / 100).toFixed(2),
        date: new Date().toLocaleDateString(),
        paymentMethod: event.payment.method,
        year: new Date().getFullYear(),
      },
    );

    this.mailService.sendMail({
      html,
      subject: 'Payment Confirmation',
      to: {
        email: event.user.email,
        name: event.user.name,
      },
    });
  }
}
