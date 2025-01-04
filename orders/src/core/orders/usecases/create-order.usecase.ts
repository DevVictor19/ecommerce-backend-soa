import { Injectable } from '@nestjs/common';

import { CartService } from '@/core/carts/services/cart-service.interface';
import { UserService } from '@/core/users/services/user-service.interface';
import { OrderStatusEventQueueService } from '@/infra/rabbitmq/services/order-status-event-queue-service.interface';

import { Order } from '../entities/order.entity';
import { OrderFactory } from '../factories/order.factory';
import { OrderCartFactory } from '../factories/order-cart.factory';
import { OrderCartMapper } from '../mappers/order-cart.mapper';
import { OrderService } from '../services/order-service.interface';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartService,
    private readonly userService: UserService,
    private readonly orderStatusEventQueueService: OrderStatusEventQueueService,
  ) {}

  async execute(userId: string): Promise<Order> {
    const [cart, user] = await Promise.all([
      this.cartService.findByUserId(userId).then(OrderCartMapper.toEntity),
      this.userService.findById(userId),
    ]);

    const orderCart = OrderCartFactory.create(
      cart._id,
      cart.products,
      cart.productsQuantity,
      cart.totalPrice,
      cart.createdAt,
    );

    const order = OrderFactory.create(userId, orderCart);

    const [newOrder] = await Promise.all([
      this.orderService.create(order),
      this.cartService.deleteById(cart._id),
    ]);

    await this.orderStatusEventQueueService.emitOrderCreatedEvent({
      order: {
        id: order._id,
        price: order.cart.totalPrice,
        products: order.cart.products.map((p) => ({
          id: p._id,
          inCartQuantity: p.inCartQuantity,
        })),
      },
      user: {
        email: user.email,
        id: user.id,
        name: user.username,
      },
    });

    return newOrder;
  }
}
