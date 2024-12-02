import { randomUUID } from 'node:crypto';

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../../entities/user.entity';
import { ROLE } from '../../enums/role.enum';
import { UsersService } from '../users-service.interface';

@Injectable()
export class UsersServiceImpl implements UsersService {
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

    const user = this.createWithClientRole(username, email, password);

    await new this.model(user).save();
  }

  async findById(userId: string): Promise<User | null> {
    return this.model.findById(userId);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email });
  }

  private createWithClientRole(
    username: string,
    email: string,
    password: string,
  ): User {
    const entity = new User();
    entity._id = randomUUID();
    entity.username = username;
    entity.password = password;
    entity.email = email;
    entity.roles = [ROLE.CLIENT];
    entity.createdAt = new Date();
    return entity;
  }
}
