import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { EnvConfigModule } from './env-config/env-config.module';

@Module({
  imports: [EnvConfigModule, AuthModule],
})
export class AppModule {}
