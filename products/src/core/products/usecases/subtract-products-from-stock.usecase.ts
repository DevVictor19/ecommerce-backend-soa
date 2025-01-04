import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';

import {
  OrderPaymentSucceedEvent,
  OrderStatusEventQueueService,
} from '@/infra/rabbitmq/services/order-status-event-queue-service.interface';

import { ProductService } from '../services/product-service.interface';

@Injectable()
export class SubtractProductsFromStockUseCase implements OnModuleInit {
  private readonly logger = new Logger(SubtractProductsFromStockUseCase.name);

  constructor(
    private readonly productService: ProductService,
    private readonly orderStatusEventQueueService: OrderStatusEventQueueService,
  ) {}

  async onModuleInit() {
    await this.orderStatusEventQueueService.consumePaymentSucceedEvent(
      this.execute.bind(this),
    );
    this.logger.log('Listening to order-payment-succeed events...');
  }

  private async execute(event: OrderPaymentSucceedEvent) {
    this.logger.log('Processing order-payment-succeed event');

    const { products } = event.order;

    if (products.length > 30) {
      throw new BadRequestException(
        'Cannot process more than 30 products for stock subtraction',
      );
    }

    const promises: Promise<void>[] = products.map(async (cartProduct) => {
      const stockProduct = await this.productService.findById(cartProduct.id);

      if (!stockProduct) {
        throw new NotFoundException(
          `Product with ID ${cartProduct.id} not found`,
        );
      }

      if (stockProduct.stockQuantity < cartProduct.inCartQuantity) {
        throw new BadRequestException(
          `Insufficient stock for product ID ${cartProduct.id}, available: ${stockProduct.stockQuantity}, Requested: ${cartProduct.inCartQuantity}`,
        );
      }

      stockProduct.stockQuantity -= cartProduct.inCartQuantity;

      await this.productService.update(stockProduct._id, {
        stockQuantity: stockProduct.stockQuantity,
      });
    });

    await Promise.all(promises);
  }
}
