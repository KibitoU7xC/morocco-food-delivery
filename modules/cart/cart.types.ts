/**
 * Cart Types
 */

import { Product, ProductVariant } from '../products/products.types';
import { Restaurant } from '../restaurants/restaurants.types';

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  product_variant_id: number | null;
  quantity: number;
  special_instructions: string | null;
  product: Product;
  variant: ProductVariant | null;
}

/**
 * A cart is scoped to a single restaurant. When the last item is removed the
 * backend keeps the cart record but nulls out `restaurant_id`/`restaurant`
 * (verified live 2026-09-04) — treat `restaurant: null` + `items: []` as
 * "empty", same as `GET /cart` returning `data: null` for a customer who has
 * never had a cart.
 */
export interface Cart {
  id: number;
  customer_id: number;
  restaurant_id: number | null;
  created_at: string;
  updated_at: string;
  items: CartItem[];
  restaurant: Restaurant | null;
}

export interface AddToCartRequest {
  product_id: number;
  product_variant_id?: number | null;
  quantity: number;
  special_instructions?: string;
}

export interface UpdateCartItemRequest {
  quantity: number;
}
