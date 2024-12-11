import { randomUUID } from 'node:crypto';

import { Order } from '../entities/order.entity';
import { OrderCart } from '../entities/order-cart.entity';
import { ORDER_STATUS } from '../enums/order-status.enum';

export class OrderFactory {
  static create(userId: string, cart: OrderCart): Order {
    const entity = new Order();

    entity._id = randomUUID();
    entity.cart = cart;
    entity.createdAt = new Date();
    entity.payment = null;
    entity.status = ORDER_STATUS.WAITING_PAYMENT;
    entity.userId = userId;

    return entity;
  }
}
