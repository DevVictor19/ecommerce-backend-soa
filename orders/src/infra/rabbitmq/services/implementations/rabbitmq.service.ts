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

  async publish(queue: string, message: any): Promise<void> {
    await this.channel.assertQueue(queue);
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    this.logger.log(`Message sent to queue "${queue}"`);
  }

  async consume(queue: string, onMessage: (msg: any) => void): Promise<void> {
    await this.channel.assertQueue(queue);
    this.channel.consume(queue, (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        onMessage(content);
        this.channel.ack(msg);
      }
    });
    this.logger.log(`Consuming messages from queue "${queue}"`);
  }
}
