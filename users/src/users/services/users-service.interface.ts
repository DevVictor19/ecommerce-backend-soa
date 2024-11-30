import { User } from '../entities/user.entity';

export abstract class UsersService {
  abstract createClient(
    username: string,
    email: string,
    password: string,
  ): Promise<void>;
  abstract findById(userId: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
}
