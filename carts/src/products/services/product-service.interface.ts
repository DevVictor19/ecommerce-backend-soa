export type ProductDto = {
  id: string;
  price: number;
  name: string;
  description: string;
  photoUrl: string;
  stockQuantity: number;
  createdAt: string;
};

export abstract class ProductService {
  abstract findById(productId: string): Promise<ProductDto>;
}
