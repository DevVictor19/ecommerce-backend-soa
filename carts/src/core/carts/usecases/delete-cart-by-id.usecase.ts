import { Injectable } from '@nestjs/common';

import { CartService } from '../services/cart-service.interface';

@Injectable()
export class DeleteCartByIdUseCase {
  constructor(private readonly cartService: CartService) {}

  async execute(cartId: string) {
    await this.cartService.delete(cartId);
  }
}
