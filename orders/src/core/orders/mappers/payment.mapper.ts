import { PaymentDto } from '../dtos/payment.dto';
import { Payment } from '../entities/payment.entity';

export class PaymentMapper {
  static toDto(entity: Payment): PaymentDto {
    const dto = new PaymentDto();

    dto.id = entity._id;
    dto.price = entity.price;
    dto.method = entity.method;
    dto.parcels = entity.parcels;
    dto.createdAt = entity.createdAt.toISOString();

    return dto;
  }
}
