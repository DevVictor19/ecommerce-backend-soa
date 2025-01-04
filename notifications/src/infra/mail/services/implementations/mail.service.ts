import { Injectable, Logger } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { EnvConfigService } from '@/infra/env-config/services/env-config-service.interface';

import { MailService, Message } from '../mail-service.interface';

@Injectable()
export class MailServiceImpl implements MailService {
  private readonly logger = new Logger(MailService.name);

  private readonly transporter: Mail;
  private readonly mailHostUser: string;
  private readonly mailHostName: string;
  private readonly mailHostPassword: string;

  constructor(envConfigService: EnvConfigService) {
    this.mailHostUser = envConfigService.getMailHostUser();
    this.mailHostName = envConfigService.getMailHostName();
    this.mailHostPassword = envConfigService.getMailHostPassword();

    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: this.mailHostUser,
        pass: this.mailHostPassword,
      },
    });
  }

  async sendMail(message: Message): Promise<void> {
    try {
      await this.transporter.sendMail({
        to: {
          name: message.to.name,
          address: message.to.email,
        },
        from: {
          name: this.mailHostName,
          address: this.mailHostUser,
        },
        subject: message.subject,
        html: message.html,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
