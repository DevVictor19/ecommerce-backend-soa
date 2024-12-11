import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvConfigService } from '@/infra/env-config/services/env-config-service.interface';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (evnConfigService: EnvConfigService) => ({
        uri: evnConfigService.getDbUri(),
        dbName: evnConfigService.getDbName(),
        user: evnConfigService.getDbUser(),
        pass: evnConfigService.getDbPassword(),
        autoIndex: true,
      }),
      inject: [EnvConfigService],
    }),
  ],
})
export class DatabaseModule {}
