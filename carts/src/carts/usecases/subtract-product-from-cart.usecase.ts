import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Cart } from '../entities/cart.entity';
import { CartService } from '../services/cart-service.interface';

@Injectable()
export class SubtractProductFromCartUseCase {
  constructor(private readonly cartService: CartService) {}

  async execute(productId: string, userId: string, quantity: number) {
    const cart = await this.cartService.findByUserId(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    this.subtractCartProduct(cart, productId, quantity);

    if (cart.productsQuantity === 0) {
      await this.cartService.delete(cart._id);
      return;
    }

    this.cartService.update(cart);
  }

  private subtractCartProduct(
    cart: Cart,
    productId: string,
    quantityToSub: number,
  ) {
    const existingProduct = cart.products.find((p) => p._id === productId);

    if (!existingProduct) {
      throw new NotFoundException('Product not present in cart');
    }

    if (existingProduct.inCartQuantity - quantityToSub < 0) {
      throw new BadRequestException(
        'Product in cart quantity cannot be less than zero',
      );
    }

    existingProduct.inCartQuantity -= quantityToSub;

    if (existingProduct.inCartQuantity === 0) {
      cart.products = cart.products.filter((p) => p._id !== productId);
    }

    const priceToSubtract = existingProduct.price * quantityToSub;

    if (cart.totalPrice - priceToSubtract < 0) {
      throw new BadRequestException('Total price cannot be less than zero');
    }

    cart.totalPrice -= priceToSubtract;

    if (cart.productsQuantity - quantityToSub < 0) {
      throw new BadRequestException(
        'Quantity to subtract must not pass the minimum cart capacity',
      );
    }

    cart.productsQuantity -= quantityToSub;
  }
}
