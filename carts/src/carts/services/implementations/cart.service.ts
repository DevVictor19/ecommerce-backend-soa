import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cart } from '@/carts/entities/cart.entity';

import { CartService } from '../cart-service.interface';

@Injectable()
export class CartServiceImpl implements CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly model: Model<Cart>,
  ) {}

  async create(cart: Cart): Promise<void> {
    await new this.model(cart).save();
  }

  async update(cart: Cart): Promise<void> {
    await this.model.findByIdAndUpdate(
      { _id: cart._id },
      {
        products: cart.products,
        totalPrice: cart.totalPrice,
        productsQuantity: cart.productsQuantity,
      },
    );
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    return this.model.findOne({ userId });
  }

  async delete(cartId: string): Promise<void> {
    await this.model.findByIdAndDelete(cartId);
  }
}
