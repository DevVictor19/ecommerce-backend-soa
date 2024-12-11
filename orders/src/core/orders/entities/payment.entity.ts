import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { PAYMENT_METHOD } from '../enums/payment-method.enum';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop()
  _id: string;

  @Prop()
  transactionCode: string;

  @Prop()
  price: number;

  @Prop({ type: String })
  method: PAYMENT_METHOD;

  @Prop()
  parcels: number;

  @Prop()
  createdAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
