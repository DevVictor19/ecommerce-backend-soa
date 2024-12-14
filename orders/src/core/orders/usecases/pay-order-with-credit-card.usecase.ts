import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserService } from '@/core/users/services/user-service.interface';
import { PaymentsQueueService } from '@/infra/rabbitmq/services/payments-queue-service.interface';

import { PayOrderWithCreditCardDto } from '../dtos/pay-order-with-credit-card.dto';
import { ORDER_STATUS } from '../enums/order-status.enum';
import { PAYMENT_METHOD } from '../enums/payment-method.enum';
import { OrderService } from '../services/order-service.interface';

type Input = {
  userId: string;
  orderId: string;
  remoteIp: string;
  dto: PayOrderWithCreditCardDto;
};

@Injectable()
export class PayOrderWithCreditCardUseCase {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly paymentsQueueService: PaymentsQueueService,
  ) {}

  async execute({ dto, orderId, remoteIp, userId }: Input) {
    const order = await this.orderService.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== ORDER_STATUS.WAITING_PAYMENT) {
      throw new BadRequestException(
        'Order status must be WAITING_PAYMENT to proceed',
      );
    }

    const user = await this.userService.findById(userId);

    if (order.userId !== user.id) {
      throw new BadRequestException("User don't owns this order to pay it");
    }

    await this.paymentsQueueService.publish({
      user: {
        id: user.id,
        email: user.email,
        name: user.username,
        remoteIp,
      },
      order: {
        id: order._id,
        price: order.cart.totalPrice,
        products: order.cart.products.map((p) => ({
          id: p._id,
          inCartQuantity: p.inCartQuantity,
        })),
      },
      payment: {
        method: PAYMENT_METHOD.CREDIT_CARD,
        document: dto.document,
        parcels: dto.parcels,
        card: dto.card,
      },
    });

    order.status = ORDER_STATUS.PROCESSING_PAYMENT;

    await this.orderService.update(order);
  }
}
