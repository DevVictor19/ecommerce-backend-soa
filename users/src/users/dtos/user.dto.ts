import { ROLE } from '../enums/role.enum';

export class UserDto {
  id: string;

  username: string;

  email: string;

  password: string;

  roles: ROLE[];

  createdAt: Date;
}
