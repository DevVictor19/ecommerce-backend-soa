import { Injectable, NotFoundException } from '@nestjs/common';

import { CartService } from '../services/cart-service.interface';

@Injectable()
export class FindCartByUserIdUseCase {
  constructor(private readonly cartService: CartService) {}

  async execute(userId: string) {
    const cart = await this.cartService.findByUserId(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }
}
