import { Module } from '@nestjs/common';

import { MailModule } from '@/infra/mail/mail.module';
import { RabbitMQModule } from '@/infra/rabbitmq/rabbitmq.module';
import { TemplateEngineModule } from '@/infra/template-engine/template-engine.module';

import { SendEmailAfterOrderCreationUseCase } from './usecases/send-email-after-order-creation.usecase';
import { SendEmailAfterSuccessfulPaymentUseCase } from './usecases/send-email-after-successful-payment.usecase';
import { SendEmailAfterUnsuccessfulPaymentUseCase } from './usecases/send-email-after-unsuccessful-payment.usecase';

@Module({
  imports: [RabbitMQModule, MailModule, TemplateEngineModule],
  providers: [
    SendEmailAfterOrderCreationUseCase,
    SendEmailAfterSuccessfulPaymentUseCase,
    SendEmailAfterUnsuccessfulPaymentUseCase,
  ],
})
export class NotificationsModule {}
