import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { NotificationsModule } from './core/notifications/notifications.module';
import { EnvConfigModule } from './infra/env-config/env-config.module';
import { MailModule } from './infra/mail/mail.module';
import { RabbitMQModule } from './infra/rabbitmq/rabbitmq.module';
import { TemplateEngineModule } from './infra/template-engine/template-engine.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    EnvConfigModule,
    MailModule,
    RabbitMQModule,
    TemplateEngineModule,
    NotificationsModule,
  ],
})
export class AppModule {}
