import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { CartProductDto } from './cart-product.dto';

export class SubtractProductsFromStockDto {
  @Type(() => CartProductDto)
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(30)
  products: CartProductDto[];
}
