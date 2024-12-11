import { Injectable } from '@nestjs/common';

import { CartService } from '@/core/carts/services/cart-service.interface';

import { Order } from '../entities/order.entity';
import { OrderFactory } from '../factories/order.factory';
import { OrderCartFactory } from '../factories/order-cart.factory';
import { CartMapper } from '../mappers/cart.mapper';
import { OrderService } from '../services/order-service.interface';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartService,
  ) {}

  async execute(userId: string): Promise<Order> {
    const cart = await this.cartService
      .findByUserId(userId)
      .then(CartMapper.toEntity);

    const orderCart = OrderCartFactory.create(
      cart._id,
      cart.products,
      cart.productsQuantity,
      cart.totalPrice,
      cart.createdAt,
    );

    const order = OrderFactory.create(userId, orderCart);

    const newOrder = await this.orderService.create(order);

    await this.cartService.deleteById(cart._id);

    return newOrder;
  }
}
