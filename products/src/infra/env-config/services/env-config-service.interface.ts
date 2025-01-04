export abstract class EnvConfigService {
  abstract getDbUri(): string;
  abstract getDbName(): string;
  abstract getDbUser(): string;
  abstract getDbPassword(): string;
  abstract getDbPort(): number;
  abstract getServerPort(): number;
  abstract getRabbitMQUrl(): string;
}
