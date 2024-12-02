import { randomUUID } from 'node:crypto';

import { User } from '../entities/user.entity';
import { ROLE } from '../enums/role.enum';

export class UsersFactory {
  static createWithClientRole(
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
