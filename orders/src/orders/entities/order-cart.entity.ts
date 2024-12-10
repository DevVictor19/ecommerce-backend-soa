import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { CartProduct } from './cart-product.entity';

export type OrderCartDocument = HydratedDocument<OrderCart>;

@Schema()
export class OrderCart {
  @Prop()
  _id: string;

  @Prop({ type: [CartProduct] })
  products: CartProduct[];

  @Prop()
  productsQuantity: number;

  @Prop()
  totalPrice: number;

  @Prop()
  createdAt: Date;
}

export const OrderCartSchema = SchemaFactory.createForClass(OrderCart);
