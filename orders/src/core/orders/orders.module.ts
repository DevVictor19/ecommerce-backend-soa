import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartsModule } from '@/core/carts/carts.module';
import { RabbitMQModule } from '@/infra/rabbitmq/rabbitmq.module';

import { UsersModule } from '../users/users.module';
import { OrdersController } from './controllers/orders.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderServiceImpl } from './services/implementations/order.service';
import { OrderService } from './services/order-service.interface';
import { CancelOrderUseCase } from './usecases/cancel-order.usecase';
import { CreateOrderUseCase } from './usecases/create-order.usecase';
import { FindAllOrdersUseCase } from './usecases/find-all-orders.usecase';
import { FindAllUserOrdersUseCase } from './usecases/find-all-user-orders.usecase';
import { FindOrderByIdUseCase } from './usecases/find-order-by-id.usecase';
import { PayOrderWithCreditCardUseCase } from './usecases/pay-order-with-credit-card.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CartsModule,
    UsersModule,
    RabbitMQModule,
  ],
  providers: [
    { provide: OrderService, useClass: OrderServiceImpl },
    CancelOrderUseCase,
    CreateOrderUseCase,
    FindAllOrdersUseCase,
    FindAllUserOrdersUseCase,
    FindOrderByIdUseCase,
    PayOrderWithCreditCardUseCase,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
