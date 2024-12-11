import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvConfigService } from './services/env-config-service.interface';
import { EnvConfigServiceImpl } from './services/implementations/env-config.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [{ provide: EnvConfigService, useClass: EnvConfigServiceImpl }],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
