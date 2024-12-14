import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvConfigService } from '../env-config-service.interface';

@Global()
@Injectable()
export class EnvConfigServiceImpl implements EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  getProductServiceUrl(): string {
    return this.configService.getOrThrow('PRODUCT_SERVICE_URL');
  }

  getRabbitMQUrl(): string {
    return this.configService.getOrThrow('RABBIT_MQ_URL');
  }

  getPaymentGatewayUrl(): string {
    return this.configService.getOrThrow('PAYMENT_GW_URL');
  }

  getPaymentGatewayKey(): string {
    return this.configService.getOrThrow('PAYMENT_GW_KEY');
  }
}
