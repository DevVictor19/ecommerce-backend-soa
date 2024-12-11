import { OrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { OrderCartMapper } from './order-cart.mapper';
import { PaymentMapper } from './payment.mapper';

export class OrderMapper {
  static toDto(entity: Order): OrderDto {
    const dto = new OrderDto();

    dto.id = entity._id;
    dto.status = entity.status;
    dto.cart = OrderCartMapper.toDto(entity.cart);
    dto.payment = entity.payment && PaymentMapper.toDto(entity.payment);
    dto.createdAt = entity.createdAt.toISOString();

    return dto;
  }
}
