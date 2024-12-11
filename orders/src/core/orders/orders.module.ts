import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartsModule } from '@/core/carts/carts.module';

import { OrdersController } from './controllers/orders.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderServiceImpl } from './services/implementations/order.service';
import { OrderService } from './services/order-service.interface';
import { CancelOrderUseCase } from './usecases/cancel-order.usecase';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { FindAllOrdersUseCase } from './usecases/find-all-orders.usecase';
import { FindAllUserOrdersUseCase } from './usecases/find-all-user-orders.usecase';
import { FindOrderByIdUseCase } from './usecases/find-order-by-id.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CartsModule,
  ],
  providers: [
    { provide: OrderService, useClass: OrderServiceImpl },
    CancelOrderUseCase,
    CreateOrderUseCase,
    FindAllOrdersUseCase,
    FindAllUserOrdersUseCase,
    FindOrderByIdUseCase,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
