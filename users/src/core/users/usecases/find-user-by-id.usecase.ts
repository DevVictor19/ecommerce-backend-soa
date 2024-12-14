import { Injectable, NotFoundException } from '@nestjs/common';

import { UserService } from '../services/user-service.interface';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(userId: string) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
