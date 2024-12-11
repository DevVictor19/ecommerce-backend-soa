import { Injectable, NotFoundException } from '@nestjs/common';

import { CartService } from '../services/cart-service.interface';

@Injectable()
export class ClearCartUseCase {
  constructor(private readonly cartService: CartService) {}

  async execute(userId: string) {
    const cart = await this.cartService.findByUserId(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.cartService.delete(cart._id);
  }
}
