import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, EnvConfigModule, UsersModule],
})
export class AppModule {}
