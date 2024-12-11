import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { CartDto } from '@/core/carts/dtos/cart.dto';

import { CartService } from '../cart-service.interface';

@Injectable()
export class CartServiceImpl implements CartService {
  constructor(private readonly httpService: HttpService) {}

  async findByUserId(userId: string): Promise<CartDto> {
    const { data } = await this.httpService.axiosRef.get(
      `/carts/user/${userId}`,
    );
    return data;
  }

  async deleteById(cartId: string): Promise<void> {
    await this.httpService.axiosRef.delete(`/carts/${cartId}`);
  }
}
