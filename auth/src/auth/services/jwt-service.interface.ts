import { ROLE } from '../enums/role.enum';
import { User } from './users-service.interface';

export type JwtPayload = {
  userId: string;
  roles: ROLE[];
};

export abstract class JwtService {
  abstract generateToken(user: User): Promise<string>;
}
