import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { EnvConfigService } from './env-config/services/env-config-service.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));

  await app.listen(app.get(EnvConfigService).getServerPort(), '0.0.0.0');
}
bootstrap();
