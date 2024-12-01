import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { EnvConfigService } from '@/env-config/services/env-config-service.interface';

import { User, UsersService } from '../users-service.interface';

@Injectable()
export class UsersServiceImpl implements UsersService {
  private readonly usersServiceUrl: string;

  constructor(
    @InjectPinoLogger(UsersService.name)
    private readonly logger: PinoLogger,
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
    try {
      await this.httpService.axiosRef.post(this.usersServiceUrl, {
        username,
        email,
        password,
      });
    } catch (err) {
      const error = err as AxiosError<HttpException>;

      this.logger.error(
        `method: createClient() | status: ${error.response?.status} | message: ${error.response?.data.message}`,
      );

      throw error;
    }
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

      this.logger.error(
        `method: findByEmail() | status: ${error.response?.status} | message: ${error.response?.data.message}`,
      );

      throw error;
    }
  }
}
