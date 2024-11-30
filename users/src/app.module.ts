import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { EnvConfigModule } from './env-config/env-config.module';

@Module({
  imports: [DatabaseModule, EnvConfigModule],
})
export class AppModule {}
