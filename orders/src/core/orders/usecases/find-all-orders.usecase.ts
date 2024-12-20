import { Injectable } from '@nestjs/common';

import { SortOrder } from '@/common/@types/pagination';

import { Order } from '../entities/order.entity';
import { ORDER_STATUS } from '../enums/order-status.enum';
import { OrderService } from '../services/order-service.interface';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute(
    page: number,
    size: number,
    sort: SortOrder,
    sortBy: keyof Order,
    status?: keyof typeof ORDER_STATUS,
  ) {
    return this.orderService.findAllPaginated({
      page,
      size,
      sort,
      sortBy,
      status,
    });
  }
}
