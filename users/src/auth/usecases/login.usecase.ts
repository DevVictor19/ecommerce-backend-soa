import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '@/users/services/users-service.interface';

import { HashService } from '../services/hash-service.interface';
import { JwtService } from '../services/jwt-service.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValidPassword = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.jwtService.generateToken(user);
  }
}
