export abstract class EnvConfigService {
  abstract getServerPort(): number;
  abstract getRabbitMQUrl(): string;
  abstract getMailHostUser(): string;
  abstract getMailHostName(): string;
  abstract getMailHostPassword(): string;
}
