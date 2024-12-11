import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { User } from '@/core/users/entities/user.entity';
import { EnvConfigService } from '@/infra/env-config/services/env-config-service.interface';

import { JwtPayload, JwtService } from '../jwt-service.interface';

@Injectable()
export class JwtServiceImpl implements JwtService {
  private readonly jwtSecret: string;

  constructor(
    private readonly nestJwtService: NestJwtService,
    envConfigService: EnvConfigService,
  ) {
    this.jwtSecret = envConfigService.getServerJwtSecret();
  }

  generateToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      roles: user.roles,
      userId: user._id,
    };

    return this.nestJwtService.signAsync(payload, {
      secret: this.jwtSecret,
      expiresIn: '4h',
    });
  }
}
