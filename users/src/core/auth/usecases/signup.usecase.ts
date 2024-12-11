import { ConflictException, Injectable } from '@nestjs/common';

import { UsersService } from '@/core/users/services/users-service.interface';

import { HashService } from '../services/hash-service.interface';

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  async execute(username: string, email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new ConflictException('Email already in use by another user');
    }

    const hashedPassword = await this.hashService.hash(password);

    await this.usersService.createClient(username, email, hashedPassword);
  }
}
