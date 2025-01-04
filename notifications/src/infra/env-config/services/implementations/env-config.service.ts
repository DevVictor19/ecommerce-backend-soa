import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvConfigService } from '../env-config-service.interface';

@Global()
@Injectable()
export class EnvConfigServiceImpl implements EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  getRabbitMQUrl(): string {
    return this.configService.getOrThrow('RABBIT_MQ_URL');
  }

  getMailHostName(): string {
    return this.configService.getOrThrow('MAIL_HOST_NAME');
  }

  getMailHostUser(): string {
    return this.configService.getOrThrow('MAIL_HOST_USER');
  }

  getMailHostPassword(): string {
    return this.configService.getOrThrow('MAIL_HOST_PASSWORD');
  }
}
