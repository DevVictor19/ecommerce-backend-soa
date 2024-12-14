import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EnvConfigService } from '@/infra/env-config/services/env-config-service.interface';

import { UserServiceImpl } from './services/implementations/user.service';
import { UserService } from './services/user-service.interface';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (envConfigService: EnvConfigService) => ({
        timeout: 5000,
        maxRedirects: 3,
        baseURL: envConfigService.getUserServiceUrl(),
      }),
      inject: [EnvConfigService],
    }),
  ],
  providers: [{ provide: UserService, useClass: UserServiceImpl }],
  exports: [UserService],
})
export class UsersModule {}
