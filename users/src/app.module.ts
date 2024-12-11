import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './core/users/users.module';
import { DatabaseModule } from './infra/database/database.module';
import { EnvConfigModule } from './infra/env-config/env-config.module';

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
