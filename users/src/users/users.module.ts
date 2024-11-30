import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
import { User, UserSchema } from './entities/user.entity';
import { UsersServiceImpl } from './services/users.service';
import { UsersService } from './services/users-service.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [{ provide: UsersService, useClass: UsersServiceImpl }],
  controllers: [UsersController],
})
export class UsersModule {}
