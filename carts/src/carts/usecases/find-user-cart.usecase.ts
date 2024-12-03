import { Injectable } from '@nestjs/common';

import { CartService } from '../services/cart-service.interface';

@Injectable()
export class FindUserCartUseCase {
  constructor(private readonly cartService: CartService) {}

  async execute(userId: string) {
    return this.cartService.findByUserId(userId);
  }
}
