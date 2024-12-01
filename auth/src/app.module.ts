import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth/auth.module';
import { EnvConfigModule } from './env-config/env-config.module';

@Module({
  imports: [EnvConfigModule, AuthModule, LoggerModule.forRoot()],
})
export class AppModule {}
