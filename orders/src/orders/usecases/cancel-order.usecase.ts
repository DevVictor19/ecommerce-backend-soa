import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ORDER_STATUS } from '../enums/order-status.enum';
import { OrderService } from '../services/order-service.interface';

@Injectable()
export class CancelOrderUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute(orderId: string, userId: string) {
    const order = await this.orderService.findByIdAndUserId(orderId, userId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== ORDER_STATUS.WAITING_PAYMENT) {
      throw new BadRequestException('Only pending orders can be canceled');
    }

    await this.orderService.delete(order._id);
  }
}
