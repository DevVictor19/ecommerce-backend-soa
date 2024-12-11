import { Cart } from '../entities/cart.entity';

export abstract class CartService {
  abstract create(cart: Cart): Promise<void>;
  abstract update(cart: Cart): Promise<void>;
  abstract findByUserId(userId: string): Promise<Cart | null>;
  abstract delete(cartId: string): Promise<void>;
}
