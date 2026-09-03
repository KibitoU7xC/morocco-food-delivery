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

export interface Cart {
  id: number;
  customer_id: number;
  restaurant_id: number;
  created_at: string;
  updated_at: string;
  items: CartItem[];
  restaurant: Restaurant;
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
