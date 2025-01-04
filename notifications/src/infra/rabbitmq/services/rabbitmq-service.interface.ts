export abstract class RabbitMQService {
  abstract publishToQueue(queue: string, message: any): Promise<void>;

  abstract consumeFromQueue(
    queue: string,
    onMessage: (msg: any) => void,
  ): Promise<void>;

  abstract publishToDirectExchange(
    exchange: string,
    routeKey: string,
    message: any,
  ): Promise<void>;

  abstract consumeFromDirectExchange(
    exchange: string,
    routeKey: string,
    onMessage: (msg: any) => void,
  ): Promise<void>;
}
