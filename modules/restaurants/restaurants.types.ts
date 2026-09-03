/**
 * Restaurants Types
 */

export interface RestaurantCategory {
  id: number;
  name: string;
  description: string | null;
  sort_order?: number;
  status?: number;
  image: string | null;
  image_url: string | null;
}

export interface Restaurant {
  id: number;
  registration_id?: number;
  owner_user_id?: number;
  restaurant_code?: string;
  category_id: number;
  name: string;
  owner_name?: string;
  slug?: string;
  email?: string;
  phone?: string;
  logo: string | null;
  cover_image: string | null;
  description: string | null;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  latitude: string;
  longitude: string;
  minimum_order_amount?: string;
  average_preparation_time?: number;
  status?: string;
  is_verified?: boolean;
  category?: RestaurantCategory;
}

export interface RestaurantFilters {
  search?: string;
  category_id?: number | string;
  page?: number;
  limit?: number;
}
