import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { UserDto } from '../../dtos/user.dto';
import { UserService } from '../user-service.interface';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(private readonly httpService: HttpService) {}

  async findById(userId: string): Promise<UserDto> {
    const { data } = await this.httpService.axiosRef.get(`/users/${userId}`);
    return data;
  }
}
