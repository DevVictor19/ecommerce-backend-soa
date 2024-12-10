import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsModule } from '@/products/products.module';

import { CartsController } from './controllers/carts.controller';
import { Cart, CartSchema } from './entities/cart.entity';
import { CartService } from './services/cart-service.interface';
import { CartServiceImpl } from './services/implementations/cart.service';
import { AddProductToCartUseCase } from './usecases/add-product-to-cart.usecase';
import { ClearCartUseCase } from './usecases/clear-cart.usecase';
import { DeleteCartByIdUseCase } from './usecases/delete-cart-by-id.usecase';
import { FindCartByUserIdUseCase } from './usecases/find-cart-by-user-id.usecase';
import { FindUserCartUseCase } from './usecases/find-user-cart.usecase';
import { SubtractProductFromCartUseCase } from './usecases/subtract-product-from-cart.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    ProductsModule,
  ],
  providers: [
    { provide: CartService, useClass: CartServiceImpl },
    AddProductToCartUseCase,
    ClearCartUseCase,
    DeleteCartByIdUseCase,
    FindCartByUserIdUseCase,
    FindUserCartUseCase,
    SubtractProductFromCartUseCase,
  ],
  controllers: [CartsController],
})
export class CartsModule {}
