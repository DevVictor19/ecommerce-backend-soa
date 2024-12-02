import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { EnvConfigService } from '@/env-config/services/env-config-service.interface';

import { User, UsersService } from '../users-service.interface';

@Injectable()
export class UsersServiceImpl implements UsersService {
  private readonly usersServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    envConfigService: EnvConfigService,
  ) {
    this.usersServiceUrl = envConfigService.getUserServiceUrl();
  }

  async createClient(
    username: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.httpService.axiosRef.post(this.usersServiceUrl, {
      username,
      email,
      password,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const { data } = await this.httpService.axiosRef.get<User>(
        `${this.usersServiceUrl}/email/${email}`,
      );

      return data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }

      throw error;
    }
  }
}
