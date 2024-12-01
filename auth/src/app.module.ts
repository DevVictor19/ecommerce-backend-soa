import { Module } from '@nestjs/common';

import { EnvConfigModule } from './env-config/env-config.module';

@Module({
  imports: [EnvConfigModule],
})
export class AppModule {}
