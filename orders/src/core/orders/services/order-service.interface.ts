import { Page, Params } from '@/common/@types/pagination';

import { Order } from '../entities/order.entity';

export abstract class OrderService {
  abstract create(order: Order): Promise<Order>;
  abstract findById(orderId: string): Promise<Order | null>;
  abstract delete(orderId: string): Promise<void>;
  abstract update(order: Order): Promise<void>;

  abstract findByIdAndUserId(
    orderId: string,
    userId: string,
  ): Promise<Order | null>;

  abstract findAllPaginated(params: Params<Order>): Promise<Page<Order>>;
}
