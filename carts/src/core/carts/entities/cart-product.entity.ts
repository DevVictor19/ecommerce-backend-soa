import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CartProductDocument = HydratedDocument<CartProduct>;

@Schema()
export class CartProduct {
  @Prop()
  _id: string;

  @Prop()
  price: number;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  photoUrl: string;

  @Prop()
  inCartQuantity: number;
}

export const CartProductSchema = SchemaFactory.createForClass(CartProduct);
