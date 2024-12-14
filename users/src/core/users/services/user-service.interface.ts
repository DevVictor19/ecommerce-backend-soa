import { User } from '../entities/user.entity';

export abstract class UserService {
  abstract createClient(
    username: string,
    email: string,
    password: string,
  ): Promise<void>;
  abstract findById(userId: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
