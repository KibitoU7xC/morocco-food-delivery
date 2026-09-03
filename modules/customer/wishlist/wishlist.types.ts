/**
 * Customer Wishlist Types
 */

import { Product } from '../../products/products.types';

export interface WishlistItem {
  id: number;
  customer_id: number;
  product_id: number;
  product: Product;
  created_at: string;
}

export interface ToggleWishlistResponse {
  status: boolean;
  message: string;
  is_favorited: boolean;
}
