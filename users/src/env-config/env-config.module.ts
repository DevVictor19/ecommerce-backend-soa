import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvConfigServiceImpl } from './services/env-config.service';
import { EnvConfigService } from './services/env-config-service.interface';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [{ provide: EnvConfigService, useClass: EnvConfigServiceImpl }],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
