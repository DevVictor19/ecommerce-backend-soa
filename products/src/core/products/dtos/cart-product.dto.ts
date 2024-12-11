import { IsPositive, IsUUID } from 'class-validator';

export class CartProductDto {
  @IsUUID()
  id: string;

  @IsPositive()
  inCartQuantity: number;
}
