/**
 * Home Module Types
 * Data models strictly based on Food Delivery App - APis.pdf (GET /api/v1/restaurants)
 */

export interface ApiRestaurantCategory {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  image_url?: string;
}

export interface ApiRestaurantItem {
  id: number;
  name: string;
  owner_name?: string;
  slug?: string;
  email?: string;
  phone?: string;
  logo?: string | null;
  cover_image?: string | null;
  description?: string | null;
  latitude?: string;
  longitude?: string;
  category_id?: number;
  category?: string | ApiRestaurantCategory;
  minimum_order_amount?: number;
  average_preparation_time?: number;
  rating?: number;
  delivery_time?: string;
  delivery_fee?: number;
  distance?: string;
  is_featured?: number;
  is_popular?: number;
}

export interface RestaurantBrand {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  delivery_time: string;
  delivery_fee: number;
  distance: string;
  is_featured: number;
  is_popular: number;
}

export interface RestaurantsApiResponse {
  status?: boolean;
  success?: boolean;
  message?: string;
  data: ApiRestaurantItem[];
}

export interface RestaurantCategoriesApiResponse {
  status?: boolean;
  success?: boolean;
  message?: string;
  data: Array<{
    id: number;
    name: string;
    description?: string;
    image?: string;
    image_url?: string;
  }>;
}
