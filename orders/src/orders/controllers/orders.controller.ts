import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';

import { Page, SortOrder } from '@/@types/pagination';

import { OrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { ORDER_STATUS } from '../enums/order-status.enum';
import { OrderMapper } from '../mappers/order.mapper';
import { CancelOrderUseCase } from '../usecases/cancel-order.usecase';
import { CreateOrderUseCase } from '../usecases/create-order.usecase';
import { FindAllOrdersUseCase } from '../usecases/find-all-orders.usecase';
import { FindAllUserOrdersUseCase } from '../usecases/find-all-user-orders.usecase';
import { FindOrderByIdUseCase } from '../usecases/find-order-by-id.usecase';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly cancelOrderUseCase: CancelOrderUseCase,
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
    private readonly findAllUserOrdersUseCase: FindAllUserOrdersUseCase,
    private readonly findOrderByIdUseCase: FindOrderByIdUseCase,
  ) {}

  @Get()
  async findAllOrders(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: SortOrder = 'DESC',
    @Query('sortBy') sortBy: keyof Order = 'createdAt',
    @Query('status') status?: keyof typeof ORDER_STATUS,
  ): Promise<Page<OrderDto>> {
    return this.findAllOrdersUseCase
      .execute(page, size, sort, sortBy, status)
      .then((data) => ({
        content: data.content.map(OrderMapper.toDto),
        page: data.page,
      }));
  }

  @Get(':orderId')
  async findOrderById(
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ): Promise<OrderDto> {
    return this.findOrderByIdUseCase.execute(orderId).then(OrderMapper.toDto);
  }

  @Get('my-orders')
  async findAllUserOrders(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: SortOrder = 'DESC',
    @Query('sortBy') sortBy: keyof Order = 'createdAt',
    @Query('status') status?: keyof typeof ORDER_STATUS,
    @Headers('x-user-id') userId?: string,
  ): Promise<Page<OrderDto>> {
    if (!userId) {
      throw new BadRequestException('Missing logged user id');
    }

    return this.findAllUserOrdersUseCase
      .execute(page, size, sort, sortBy, userId, status)
      .then((data) => ({
        content: data.content.map(OrderMapper.toDto),
        page: data.page,
      }));
  }

  @Post('my-orders')
  async createOrder(@Headers('x-user-id') userId?: string): Promise<OrderDto> {
    if (!userId) {
      throw new BadRequestException('Missing logged user id');
    }

    return this.createOrderUseCase.execute(userId).then(OrderMapper.toDto);
  }

  @Delete('my-orders/:orderId')
  async cancelOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Headers('x-user-id') userId?: string,
  ) {
    if (!userId) {
      throw new BadRequestException('Missing logged user id');
    }

    await this.cancelOrderUseCase.execute(orderId, userId);
  }
}
