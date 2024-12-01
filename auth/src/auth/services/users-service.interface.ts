import { ROLE } from '../enums/role.enum';

// comes from users service (dto)
export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  roles: ROLE[];
  createdAt: Date;
};

export abstract class UsersService {
  abstract createClient(
    username: string,
    email: string,
    password: string,
  ): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
}
