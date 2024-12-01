import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvConfigService } from '../env-config-service.interface';

@Global()
@Injectable()
export class EnvConfigServiceImpl implements EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  getUserServiceUrl(): string {
    return this.configService.getOrThrow('USER_SERVICE_URL');
  }

  getServerPort(): number {
    return this.configService.getOrThrow('SERVER_PORT');
  }

  getServerJwtSecret(): string {
    return this.configService.getOrThrow('SERVER_JWT_SECRET');
  }
}
