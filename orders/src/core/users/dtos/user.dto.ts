import { IsArray, IsDateString, IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsArray()
  roles: string[];

  @IsDateString()
  createdAt: string;
}
