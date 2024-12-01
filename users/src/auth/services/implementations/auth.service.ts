import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '@/users/services/users-service.interface';

import { AuthService } from '../auth-service.interface';
import { HashService } from '../hash-service.interface';
import { JwtService } from '../jwt-service.interface';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
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

  async signup(
    username: string,
    email: string,
    password: string,
  ): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new ConflictException('Email already in use by another user');
    }

    const hashedPassword = await this.hashService.hash(password);

    await this.usersService.createClient(username, email, hashedPassword);
  }
}
