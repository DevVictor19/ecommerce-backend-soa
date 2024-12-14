export abstract class EnvConfigService {
  abstract getProductServiceUrl(): string;
  abstract getRabbitMQUrl(): string;
  abstract getPaymentGatewayUrl(): string;
  abstract getPaymentGatewayKey(): string;
}
