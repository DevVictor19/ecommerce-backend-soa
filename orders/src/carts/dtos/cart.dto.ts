import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CartProductDto } from './cart-product.dto';

export class CartDto {
  @IsString()
  id: string;

  @Type(() => CartProductDto)
  @ValidateNested({ each: true })
  @IsArray()
  products: CartProductDto[];

  @IsPositive()
  @IsInt()
  productsQuantity: number;

  @IsPositive()
  @IsInt()
  totalPrice: number;

  @IsDateString()
  createdAt: string;
}
