import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';

import { Page, Params } from '@/@types/pagination';
import { Product } from '@/products/entities/product.entity';
import { ProductFactory } from '@/products/factories/product.factory';

import { ProductService } from '../product-service.interface';

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly model: Model<Product>,
  ) {}

  async findAllPaginated({
    page = 0,
    size = 10,
    sort,
    sortBy,
    ...filters
  }: Params<Product>): Promise<Page<Product>> {
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

  async create(
    price: number,
    name: string,
    description: string,
    photoUrl: string,
    stockQuantity: number,
  ): Promise<void> {
    const product = ProductFactory.create(
      price,
      name,
      description,
      photoUrl,
      stockQuantity,
    );

    await new this.model(product).save();
  }

  async update(
    productId: string,
    fields: Partial<Omit<Product, '_id' | 'createdAt'>>,
  ): Promise<void> {
    await this.model.findByIdAndUpdate({ _id: productId }, fields);
  }

  async findByName(name: string): Promise<Product | null> {
    return this.model.findOne({ name });
  }

  async findById(productId: string): Promise<Product | null> {
    return this.model.findById(productId);
  }

  async delete(productId: string): Promise<void> {
    await this.model.deleteOne({
      _id: productId,
    });
  }
}
