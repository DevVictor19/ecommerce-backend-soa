import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvConfigService } from '../env-config-service.interface';

@Global()
@Injectable()
export class EnvConfigServiceImpl implements EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  getDbUri(): string {
    return this.configService.getOrThrow('DB_URI');
  }

  getDbName(): string {
    return this.configService.getOrThrow('DB_NAME');
  }

  getDbUser(): string {
    return this.configService.getOrThrow('DB_USER');
  }

  getDbPassword(): string {
    return this.configService.getOrThrow('DB_PASSWORD');
  }

  getDbPort(): number {
    return this.configService.getOrThrow('DB_PORT');
  }

  getServerPort(): number {
    return this.configService.getOrThrow('SERVER_PORT');
  }

  getRabbitMQUrl(): string {
    return this.configService.getOrThrow('RABBIT_MQ_URL');
  }
}
