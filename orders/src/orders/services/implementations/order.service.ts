import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';

import { Page, Params } from '@/@types/pagination';
import { Order } from '@/orders/entities/order.entity';

import { OrderService } from '../order-service.interface';

@Injectable()
export class OrderServiceImpl implements OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly model: Model<Order>,
  ) {}

  async create(order: Order): Promise<Order> {
    return new this.model(order).save();
  }

  async findById(orderId: string): Promise<Order | null> {
    return this.model.findById(orderId);
  }

  async delete(orderId: string): Promise<void> {
    await this.model.findByIdAndDelete(orderId);
  }

  async update(order: Order): Promise<void> {
    await this.model.findByIdAndUpdate(
      { _id: order._id },
      {
        cart: order.cart,
        payment: order.payment,
        status: order.status,
      },
    );
  }

  async findByIdAndUserId(
    orderId: string,
    userId: string,
  ): Promise<Order | null> {
    return this.model.findOne({ _id: orderId, userId });
  }

  async findAllPaginated({
    page = 0,
    size = 10,
    sort,
    sortBy,
    ...filters
  }: Params<Order>): Promise<Page<Order>> {
    if (isNaN(page)) page = 0;
    if (isNaN(size)) size = 10;

    const sortConfig = { [sortBy]: sort === 'ASC' ? 1 : -1 } as {
      [key: string]: SortOrder;
    };

    const filterConfig: Record<string, any> = {};

    Object.keys(filters).forEach((key) => {
      const filterValue = filters[key as keyof typeof filters];

      if (filterValue !== undefined && filterValue.trim() !== '') {
        filterConfig[key] = { $regex: new RegExp(filterValue.trim(), 'i') };
      }
    });

    const [totalElements, content] = await Promise.all([
      this.model.countDocuments(filterConfig),
      this.model
        .find(filterConfig)
        .sort(sortConfig)
        .skip(page * size)
        .limit(size)
        .exec(),
    ]);

    const totalPages = Math.ceil(totalElements / size);

    return {
      content,
      page: {
        size,
        number: page,
        totalElements,
        totalPages,
      },
    };
  }
}
