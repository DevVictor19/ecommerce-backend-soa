import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import * as amqp from 'amqplib';

import { EnvConfigService } from '@/infra/env-config/services/env-config-service.interface';

import { RabbitMQService } from '../rabbitmq-service.interface';

@Injectable()
export class RabbitMQServiceImpl
  implements RabbitMQService, OnModuleInit, OnModuleDestroy
{
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly rabbitMQUrl: string;
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(envConfigService: EnvConfigService) {
    this.rabbitMQUrl = envConfigService.getRabbitMQUrl();
  }

  async onModuleInit() {
    this.connection = await amqp.connect(this.rabbitMQUrl);
    this.channel = await this.connection.createChannel();
    this.logger.log('RabbitMQ connected');
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
    this.logger.log('RabbitMQ disconnected');
  }

  async publishToQueue(queue: string, message: any): Promise<void> {
    await this.channel.assertQueue(queue);
    this.channel.sendToQueue(queue, this.prepareMessage(message));
    this.logger.log(`Message sent to queue "${queue}"`);
  }

  async consumeFromQueue(
    queue: string,
    onMessage: (msg: any) => void,
  ): Promise<void> {
    await this.channel.assertQueue(queue);
    this.channel.consume(queue, (msg) => {
      if (msg) {
        onMessage(this.parseMessage(msg.content));
        this.channel.ack(msg);
      }
    });
    this.logger.log(`Consuming messages from queue "${queue}"`);
  }

  async publishToDirectExchange(
    exchange: string,
    routeKey: string,
    message: any,
  ): Promise<void> {
    await this.channel.assertExchange(exchange, 'direct', {
      durable: false,
    });

    this.channel.publish(exchange, routeKey, this.prepareMessage(message));
    this.logger.log(`Message sent to exchange "${exchange}"`);
  }

  async consumeFromDirectExchange(
    exchange: string,
    routeKey: string,
    onMessage: (msg: any) => void,
  ): Promise<void> {
    await this.channel.assertExchange(exchange, 'direct', {
      durable: false,
    });

    const { queue } = await this.channel.assertQueue('', { exclusive: true });

    await this.channel.bindQueue(queue, exchange, routeKey);

    this.channel.consume(
      queue,
      (msg) => {
        if (msg) {
          onMessage(this.parseMessage(msg.content));
        }
        this.logger.log(`Consuming messages from exchange "${exchange}"`);
      },
      { noAck: true },
    );
  }

  private prepareMessage(message: any) {
    return Buffer.from(JSON.stringify(message));
  }

  private parseMessage(message: Buffer) {
    return JSON.parse(message.toString());
  }
}
