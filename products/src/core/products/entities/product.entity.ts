import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'products' })
export class Product {
  @Prop()
  _id: string;

  @Prop()
  price: number;

  @Prop({ index: 'text' })
  name: string;

  @Prop()
  description: string;

  @Prop()
  photoUrl: string;

  @Prop()
  stockQuantity: number;

  @Prop()
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
