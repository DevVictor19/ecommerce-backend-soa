import { ConflictException, Injectable } from '@nestjs/common';

import { UserService } from '@/core/users/services/user-service.interface';

import { HashService } from '../services/hash-service.interface';

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async execute(username: string, email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new ConflictException('Email already in use by another user');
    }

    const hashedPassword = await this.hashService.hash(password);

    await this.userService.createClient(username, email, hashedPassword);
  }
}
