import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@/users/users.module';

import { AuthController } from './controllers/auth.controller';
import { HashService } from './services/hash-service.interface';
import { HashServiceImpl } from './services/implementations/hash.service';
import { JwtServiceImpl } from './services/implementations/jwt.service';
import { JwtService } from './services/jwt-service.interface';
import { LoginUseCase } from './usecases/login.usecase';
import { SignupUseCase } from './usecases/signup.usecase';

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
    LoginUseCase,
    SignupUseCase,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
