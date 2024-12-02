import { User } from '@/users/entities/user.entity';
import { ROLE } from '@/users/enums/role.enum';

export type JwtPayload = {
  userId: string;
  roles: ROLE[];
};

export abstract class JwtService {
  abstract generateToken(user: User): Promise<string>;
}
