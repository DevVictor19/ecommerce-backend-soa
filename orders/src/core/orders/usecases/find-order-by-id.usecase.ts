import { Injectable, NotFoundException } from '@nestjs/common';

import { OrderService } from '../services/order-service.interface';

@Injectable()
export class FindOrderByIdUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute(orderId: string) {
    const order = await this.orderService.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
