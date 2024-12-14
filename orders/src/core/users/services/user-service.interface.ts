import { UserDto } from '../dtos/user.dto';

export abstract class UserService {
  abstract findById(userId: string): Promise<UserDto>;
}
