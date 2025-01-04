export abstract class EnvConfigService {
  abstract getRabbitMQUrl(): string;
  abstract getMailHostUser(): string;
  abstract getMailHostName(): string;
  abstract getMailHostPassword(): string;
}
