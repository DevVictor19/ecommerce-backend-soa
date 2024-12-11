import { IsInt, IsPositive, IsString, IsUrl, Length } from 'class-validator';

export class CartProductDto {
  @IsString()
  id: string;

  @IsPositive()
  @IsInt()
  price: number;

  @IsString()
  @Length(4, 100)
  name: string;

  @IsString()
  @Length(4, 100)
  description: string;

  @IsUrl()
  photoUrl: string;

  @IsPositive()
  @IsInt()
  inCartQuantity: number;
}
