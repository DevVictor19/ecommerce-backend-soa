export abstract class RabbitMQService {
  abstract publish(queue: string, message: any): Promise<void>;
  abstract consume(queue: string, onMessage: (msg: any) => void): Promise<void>;
}
