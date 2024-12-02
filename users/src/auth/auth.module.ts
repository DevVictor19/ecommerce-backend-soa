import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@/users/users.module';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth-service.interface';
import { HashService } from './services/hash-service.interface';
import { AuthServiceImpl } from './services/implementations/auth.service';
import { HashServiceImpl } from './services/implementations/hash.service';
import { JwtServiceImpl } from './services/implementations/jwt.service';
import { JwtService } from './services/jwt-service.interface';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    JwtModule,
    UsersModule,
  ],
  providers: [
    { provide: HashService, useClass: HashServiceImpl },
    { provide: JwtService, useClass: JwtServiceImpl },
    { provide: AuthService, useClass: AuthServiceImpl },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
