import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersFactory } from '@/core/users/factories/users.factory';

import { User } from '../../entities/user.entity';
import { UserService } from '../user-service.interface';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @InjectModel(User.name)
    private readonly model: Model<User>,
  ) {}

  async createClient(
    username: string,
    email: string,
    password: string,
  ): Promise<void> {
    const existentUser = await this.model.findOne({ email });

    if (existentUser) {
      throw new ConflictException('Email already in use by another user');
    }

    const user = UsersFactory.createWithClientRole(username, email, password);

    await new this.model(user).save();
  }

  async findById(userId: string): Promise<User | null> {
    return this.model.findById(userId);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email });
  }
}
