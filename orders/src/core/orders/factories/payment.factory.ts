import { randomUUID } from 'node:crypto';

import { Payment } from '../entities/payment.entity';
import { PAYMENT_METHOD } from '../enums/payment-method.enum';

export class PaymentFactory {
  static createForCreditCard(
    transactionCode: string,
    price: number,
    parcels: number,
  ): Payment {
    const entity = new Payment();
    entity._id = randomUUID();
    entity.createdAt = new Date();
    entity.method = PAYMENT_METHOD.CREDIT_CARD;
    entity.parcels = parcels;
    entity.price = price;
    entity.transactionCode = transactionCode;
    return entity;
  }

  static createForDebitCard(transactionCode: string, price: number) {
    const entity = new Payment();
    entity._id = randomUUID();
    entity.createdAt = new Date();
    entity.method = PAYMENT_METHOD.DEBIT_CARD;
    entity.parcels = 0;
    entity.price = price;
    entity.transactionCode = transactionCode;
    return entity;
  }
}
