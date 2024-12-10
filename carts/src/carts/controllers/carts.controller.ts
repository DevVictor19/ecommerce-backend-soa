import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { CartDto } from '../dtos/cart.dto';
import { CartMapper } from '../mappers/cart.mapper';
import { AddProductToCartUseCase } from '../usecases/add-product-to-cart.usecase';
import { ClearCartUseCase } from '../usecases/clear-cart.usecase';
import { DeleteCartByIdUseCase } from '../usecases/delete-cart-by-id.usecase';
import { FindCartByUserIdUseCase } from '../usecases/find-cart-by-user-id.usecase';
import { FindUserCartUseCase } from '../usecases/find-user-cart.usecase';
import { SubtractProductFromCartUseCase } from '../usecases/subtract-product-from-cart.usecase';

@Controller('carts')
export class CartsController {
  constructor(
    private readonly addProductToCartUseCase: AddProductToCartUseCase,
    private readonly clearCartUseCase: ClearCartUseCase,
    private readonly deleteCartByIdUseCase: DeleteCartByIdUseCase,
    private readonly findCartByUserIdUseCase: FindCartByUserIdUseCase,
    private readonly findUserCartUseCase: FindUserCartUseCase,
    private readonly subtractProductFromCartUseCase: SubtractProductFromCartUseCase,
  ) {}

  @Get('user/:userId')
  async findByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<CartDto> {
    return this.findCartByUserIdUseCase.execute(userId).then(CartMapper.toDto);
  }

  @Delete(':cartId')
  async deleteById(@Param('cartId', ParseUUIDPipe) cartId: string) {
    await this.deleteCartByIdUseCase.execute(cartId);
  }

  @Get('my-cart')
  async findUserCart(
    @Res() res: FastifyReply,
    @Headers('x-user-id') userId?: string,
  ) {
    if (!userId) {
      throw new BadRequestException('Missing logged user id');
    }

    const cart = await this.findUserCartUseCase.execute(userId);

    if (!cart) {
      return res.code(HttpStatus.NO_CONTENT).send();
    }

    return res.send(CartMapper.toDto(cart));
  }

  @Delete('my-cart')
  async clearCart(@Headers('x-user-id') userId?: string) {
    if (!userId) {
      throw new BadRequestException('Missing logged user id');
    }

    await this.clearCartUseCase.execute(userId);
  }

  @Post('my-cart/products/:productId')
  async addProductToCart(
    @Param('productId', ParseUUIDPipe) productId: string,
    @Query('quantity', ParseIntPipe) quantity: number,
    @Headers('x-user-id') userId?: string,
  ) {
    if (!userId) {
      throw new BadRequestException('Missing logged user id');
    }

    await this.addProductToCartUseCase.execute(productId, userId, quantity);
  }

  @Delete('my-cart/products/:productId')
  async subtractProductFromCart(
    @Req() req: any,
    @Param('productId', ParseUUIDPipe) productId: string,
    @Query('quantity', ParseIntPipe) quantity: number,
    @Headers('x-user-id') userId?: string,
  ) {
    if (!userId) {
      throw new BadRequestException('Missing logged user id');
    }

    await this.subtractProductFromCartUseCase.execute(
      productId,
      userId,
      quantity,
    );
  }
}
