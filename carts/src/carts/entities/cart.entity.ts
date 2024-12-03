import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { CartProduct } from './cart-product.entity';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ collection: 'carts' })
export class Cart {
  @Prop()
  _id: string;

  @Prop({ unique: true })
  userId: string;

  @Prop({ type: [CartProduct] })
  products: CartProduct[];

  @Prop()
  productsQuantity: number;

  @Prop()
  totalPrice: number;

  @Prop()
  createdAt: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
