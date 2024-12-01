export abstract class EnvConfigService {
  abstract getUserServiceUrl(): string;
  abstract getServerPort(): number;
}
