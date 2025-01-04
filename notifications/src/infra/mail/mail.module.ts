import { Module } from '@nestjs/common';

import { MailServiceImpl } from './services/implementations/mail.service';
import { MailService } from './services/mail-service.interface';

@Module({
  providers: [{ provide: MailService, useClass: MailServiceImpl }],
  exports: [MailService],
})
export class MailModule {}
