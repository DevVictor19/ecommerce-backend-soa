import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ProductDto } from '@/products/dtos/product.dto';
import { ProductService } from '@/products/services/product-service.interface';

import { Cart } from '../entities/cart.entity';
import { CartProduct } from '../entities/cart-product.entity';
import { CartFactory } from '../factories/cart.factory';
import { CartProductFactory } from '../factories/cart-product.factory';
import { CartService } from '../services/cart-service.interface';

@Injectable()
export class AddProductToCartUseCase {
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
  ) {}

  async execute(productId: string, userId: string, quantity: number) {
    const product = await this.productService.findById(productId);

    const userCart = await this.cartService.findByUserId(userId);

    const cartProduct = CartProductFactory.create(
      product.id,
      product.price,
      product.name,
      product.description,
      product.photoUrl,
      quantity,
    );

    if (userCart) {
      this.addCartProduct(userCart, cartProduct);

      this.checkCartProductStockAvailability(userCart, product);

      await this.cartService.update(userCart);

      return;
    }

    const newCart = CartFactory.create(userId);

    this.addCartProduct(newCart, cartProduct);

    this.checkCartProductStockAvailability(newCart, product);

    await this.cartService.create(newCart);
  }

  private addCartProduct(cart: Cart, product: CartProduct) {
    if (product.inCartQuantity <= 0) {
      throw new BadRequestException('Quantity to add must be a positive value');
    }

    if (cart.productsQuantity + product.inCartQuantity > 30) {
      throw new BadRequestException(
        'Quantity to add must not pass the maximum cart capacity',
      );
    }

    const existingProduct = cart.products.find((p) => p._id === product._id);

    if (existingProduct) {
      existingProduct.inCartQuantity += product.inCartQuantity;
    } else {
      cart.products.push(product);
    }

    const priceToAdd = product.price * product.inCartQuantity;

    if (priceToAdd <= 0) {
      throw new BadRequestException('Price to add must be a positive value');
    }

    cart.totalPrice += priceToAdd;

    cart.productsQuantity += product.inCartQuantity;
  }

  private checkCartProductStockAvailability(
    cart: Cart,
    stockProduct: ProductDto,
  ) {
    const cartProduct = cart.products.find((p) => p._id === stockProduct.id);

    if (!cartProduct) {
      throw new NotFoundException('Product not present in cart');
    }

    if (cartProduct.inCartQuantity > stockProduct.stockQuantity) {
      throw new BadRequestException(
        'Insufficient quantity of product in stock to add',
      );
    }
  }
}
