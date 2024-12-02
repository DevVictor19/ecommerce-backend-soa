import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    EnvConfigModule,
    AuthModule,
    UsersModule,
    LoggerModule.forRoot(),
  ],
})
export class AppModule {}
