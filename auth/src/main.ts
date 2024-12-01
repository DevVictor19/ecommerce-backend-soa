import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { AxiosExceptionFilter } from './common/filters/axios-exception.filter';
import { EnvConfigService } from './env-config/services/env-config-service.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalFilters(new AxiosExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(app.get(EnvConfigService).getServerPort(), '0.0.0.0');
}
bootstrap();
