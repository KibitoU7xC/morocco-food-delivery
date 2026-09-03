/**
 * Products Types
 */

export interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  price: string;
  stock_quantity: number;
  is_active: boolean;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image: string;
  sort_order?: number;
  is_primary: boolean;
}

export interface Product {
  id: number;
  restaurant_id?: number;
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  sku: string;
  price: string;
  preparation_time?: number;
  dietary_type?: 'veg' | 'non_veg';
  track_inventory: boolean;
  stock_quantity: number | null;
  in_stock: boolean;
  is_featured: boolean;
  is_trending: boolean;
  is_active: boolean;
  primary_image?: ProductImage;
  images?: ProductImage[];
  variants?: ProductVariant[];
  restaurant?: {
    id: number;
    name: string;
  };
}

export interface ProductFilterParams {
  search?: string;
  category_id?: number;
  restaurant_id?: number;
  min_price?: number;
  max_price?: number;
  is_veg?: number;
  sort_by?: 'price' | 'created_at';
  sort_order?: 'asc' | 'desc';
  is_featured?: number;
  is_trending?: number;
  page?: number;
  limit?: number;
}
