import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { DatabaseModule } from './database/database.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    EnvConfigModule,
    UsersModule,
    LoggerModule.forRoot(),
  ],
})
export class AppModule {}
