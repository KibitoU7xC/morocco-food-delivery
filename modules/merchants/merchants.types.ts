/**
 * Merchants Types
 */

export interface MerchantMainCategory {
  id: number;
  name: string; // "Groceries", "Food", "Shops"
  description: string;
  sort_order: number;
  status: number;
  image: string | null;
  image_url: string | null;
}

export interface Merchant {
  id: number;
  name: string;
  owner_name: string;
  logo: string | null;
  cover_image: string | null;
  description: string | null;
  latitude: string;
  longitude: string;
  category_id: number;
  category?: MerchantMainCategory;
}

export interface MerchantSubCategory {
  id: number;
  name: string;
  url_key: string;
  category_image: string | null;
  products_count: number;
  pivot?: {
    merchant_type: string;
    merchant_id: number;
    category_id: number;
  };
}
