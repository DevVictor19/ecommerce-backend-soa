import { Page, Params } from '@/common/@types/pagination';

import { Product } from '../entities/product.entity';

export abstract class ProductService {
  abstract findAllPaginated(params: Params<Product>): Promise<Page<Product>>;

  abstract create(
    price: number,
    name: string,
    description: string,
    photoUrl: string,
    stockQuantity: number,
  ): Promise<void>;

  abstract update(
    productId: string,
    fields: Partial<Omit<Product, '_id' | 'createdAt'>>,
  ): Promise<void>;

  abstract findByName(name: string): Promise<Product | null>;
  abstract findById(productId: string): Promise<Product | null>;
  abstract delete(productId: string): Promise<void>;
}
