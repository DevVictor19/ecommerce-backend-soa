import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './entities/user.entity';
import { UsersServiceImpl } from './services/implementations/users.service';
import { UsersService } from './services/users-service.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [{ provide: UsersService, useClass: UsersServiceImpl }],
  exports: [UsersService],
})
export class UsersModule {}
