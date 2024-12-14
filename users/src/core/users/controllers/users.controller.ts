import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';

import { UserDto } from '../dtos/user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { FindUserByIdUseCase } from '../usecases/find-user-by-id.usecase';

@Controller('users')
export class UsersController {
  constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase) {}

  @Get(':userId')
  async findById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserDto> {
    return this.findUserByIdUseCase.execute(userId).then(UserMapper.toDto);
  }
}
