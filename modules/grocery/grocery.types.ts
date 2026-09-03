/**
 * Grocery Types
 */

export interface GroceryStore {
  id: number;
  name: string;
  owner_name?: string;
  logo: string | null;
  cover_image: string | null;
  description: string | null;
  latitude: string;
  longitude: string;
  category_id: number;
}

export interface GroceryAisle {
  id: number;
  name: string;
  url_key: string;
  category_image: string | null;
  products_count: number;
}

export interface GroceryProduct {
  id: number;
  merchant_id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  sku: string;
  price: string;
  in_stock: boolean;
  stock_quantity: number;
  dietary_type?: 'veg' | 'non_veg';
  primary_image?: {
    id: number;
    image: string;
    is_primary: boolean;
  };
}
