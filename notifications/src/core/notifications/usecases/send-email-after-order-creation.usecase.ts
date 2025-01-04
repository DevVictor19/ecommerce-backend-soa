import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { MailService } from '@/infra/mail/services/mail-service.interface';
import {
  OrderCreatedEvent,
  OrderStatusEventQueueService,
} from '@/infra/rabbitmq/services/order-status-event-queue-service.interface';
import { TemplateEngineService } from '@/infra/template-engine/services/template-engine-service.interface';

@Injectable()
export class SendEmailAfterOrderCreationUseCase implements OnModuleInit {
  private readonly logger = new Logger(SendEmailAfterOrderCreationUseCase.name);

  constructor(
    private readonly orderStatusEventQueueService: OrderStatusEventQueueService,
    private readonly mailService: MailService,
    private readonly templateEngineService: TemplateEngineService,
  ) {}

  async onModuleInit() {
    await this.orderStatusEventQueueService.consumeOrderCreatedEvent(
      this.execute.bind(this),
    );
    this.logger.log('Listening for order creation events...');
  }

  private async execute(event: OrderCreatedEvent) {
    this.logger.log('Processing order creation event');

    const html = await this.templateEngineService.compile('order-created.hbs', {
      orderId: event.order.id,
      year: new Date().getFullYear(),
    });

    this.mailService.sendMail({
      html,
      subject: 'Order Confirmation - Awaiting Payment',
      to: {
        email: event.user.email,
        name: event.user.name,
      },
    });
  }
}
