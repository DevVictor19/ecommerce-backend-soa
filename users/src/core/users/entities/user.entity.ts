import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { ROLE } from '../enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  @Prop()
  _id: string;

  @Prop()
  username: string;

  @Prop({ index: 'text' })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [String] })
  roles: ROLE[];

  @Prop()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
