import { CartDto } from '../dtos/cart.dto';

export abstract class CartService {
  abstract findByUserId(userId: string): Promise<CartDto>;
  abstract deleteById(cartId: string): Promise<void>;
}
