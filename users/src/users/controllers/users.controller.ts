import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { UsersService } from '../services/users-service.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createClient(
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Get(':userId')
  async findByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserDto> {
    return this.usersService.findById(userId).then(UserMapper.toDto);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<UserDto> {
    return this.usersService.findByEmail(email).then(UserMapper.toDto);
  }
}
