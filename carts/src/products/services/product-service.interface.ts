import { ProductDto } from '../dtos/product.dto';

export abstract class ProductService {
  abstract findById(productId: string): Promise<ProductDto>;
}
