export type CartProductDto = {
  id: string;
  inCartQuantity: number;
};

export abstract class ProductService {
  abstract checkStockAvailability(products: CartProductDto[]): Promise<void>;
}
