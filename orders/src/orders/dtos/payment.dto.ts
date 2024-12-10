import {
  IsDateString,
  IsIn,
  IsInt,
  IsPositive,
  IsString,
} from 'class-validator';

import { PAYMENT_METHOD } from '../enums/payment-method.enum';

export class PaymentDto {
  @IsString()
  id: string;

  @IsPositive()
  @IsInt()
  price: number;

  @IsIn([PAYMENT_METHOD.CREDIT_CARD, PAYMENT_METHOD.DEBIT_CARD])
  method: PAYMENT_METHOD;

  @IsPositive()
  @IsInt()
  parcels: number;

  @IsDateString()
  createdAt: string;
}
