import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
import { User, UserSchema } from './entities/user.entity';
import { UserServiceImpl } from './services/implementations/user.service';
import { UserService } from './services/user-service.interface';
import { FindUserByIdUseCase } from './usecases/find-user-by-id.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    { provide: UserService, useClass: UserServiceImpl },
    FindUserByIdUseCase,
  ],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
