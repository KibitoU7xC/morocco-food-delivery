/**
 * Restaurants Types
 * Data contracts strictly based on Food Delivery App - APis.pdf:
 * - GET /api/v1/restaurants
 * - GET /api/v1/restaurants/categories
 * - GET /api/v1/restaurants/{id}
 * - GET /api/v1/restaurants/{id}/reviews
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
  minimum_order_amount?: string | number;
  average_preparation_time?: number;
  status?: string;
  is_verified?: boolean;
  category?: RestaurantCategory | string;
  // Dynamic or computed fields
  rating?: number;
  delivery_time?: string;
  delivery_fee?: number;
  distance?: string;
  is_featured?: number;
  is_popular?: number;
}

export interface RestaurantPagination {
  page: number;
  limit: number;
  start?: number;
  end?: number;
  total: number;
  page_count: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  next_page: number | null;
  previous_page: number | null;
}

export interface RestaurantFilters {
  search?: string;
  category_id?: number | string | null;
  page?: number;
  limit?: number;
}

export interface RestaurantListApiResponse {
  success?: boolean;
  status?: boolean;
  message?: string;
  data: Restaurant[];
  pagination?: RestaurantPagination;
  filters?: {
    search?: string | null;
    category_id?: string | number | null;
  };
}

export interface RestaurantCategoriesApiResponse {
  status?: boolean;
  success?: boolean;
  message?: string;
  data: RestaurantCategory[];
}

/**
 * Raw Product models from GET /api/v1/products
 */
export interface ProductImage {
  id: number;
  product_id: number;
  image: string;
  is_primary?: boolean;
  sort_order?: number;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  price: string | number;
  stock_quantity?: number;
  is_active?: boolean;
}

export interface RawProduct {
  id: number;
  restaurant_id: number;
  category_id: number;
  name: string;
  slug?: string;
  description: string | null;
  sku?: string;
  price: string | number;
  preparation_time?: number;
  dietary_type?: 'veg' | 'non_veg' | string;
  track_inventory?: boolean;
  stock_quantity?: number | null;
  in_stock?: boolean;
  is_featured?: boolean;
  is_trending?: boolean;
  is_active?: boolean;
  primary_image?: ProductImage | null;
  images?: ProductImage[];
  variants?: ProductVariant[];
  restaurant?: {
    id: number;
    name: string;
    slug?: string;
  };
  category?: {
    id: number;
    name: string;
  };
}

export interface ProductListApiResponse {
  success?: boolean;
  status?: boolean;
  message?: string;
  data: RawProduct[];
  pagination?: RestaurantPagination;
  filters?: {
    search?: string | null;
    category_id?: number | null;
    restaurant_id?: number | null;
    min_price?: number | null;
    max_price?: number | null;
    is_veg?: number | null;
    sort_by?: string | null;
    sort_order?: string | null;
  };
}

/**
 * Normalized UI Food Product Item
 */
export interface FoodProductItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  formattedPrice: string;
  prepTime: number;
  dietaryType: 'veg' | 'non_veg';
  isVeg: boolean;
  image: string;
  restaurantId: number;
  restaurantName: string;
  categoryId: number;
  categoryName: string;
  inStock: boolean;
  isFeatured: boolean;
  isTrending: boolean;
}

export interface RestaurantPromoCode {
  id: number;
  code: string;
  title: string;
  description: string | null;
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  minOrderAmount: number;
}

export interface RestaurantReviewItem {
  id: number;
  reviewerName: string;
  ratingFood: number;
  ratingDelivery: number;
  comment: string | null;
  createdAt: string;
}

/**
 * Normalized UI Restaurant Item matching restaruants_stich design
 */
export interface RestaurantItem {
  id: number;
  name: string;
  slug: string;
  image: string;
  promoBadge: string;
  rating: number;
  ratingCount?: number;
  deliveryTime: string;
  prepMinutes: number;
  cuisines: string;
  district: string;
  city: string;
  isHalal: boolean;
  hasOffer: boolean;
  costForTwo: number;
  minOrder: number;
  categoryId?: number;
  hasVegOption?: boolean;
  promoCodes?: RestaurantPromoCode[];
}

/**
 * Circular Cuisine Category for "What's on your mind?" carousel
 */
export interface CuisineCategory {
  id: string;
  categoryId: number;
  name: string;
  image: string;
  slug?: string;
}

export type SortOption =
  | 'relevance'
  | 'delivery_time'
  | 'rating'
  | 'cost_low'
  | 'cost_high';

export interface RestaurantFilterState {
  search: string;
  cuisine: string | null;
  categoryId: number | null;
  sort: SortOption;
  fastDelivery: boolean;
  rating4Plus: boolean;
  pureVeg: boolean;
  halalOnly: boolean;
  offersOnly: boolean;
  under50MAD: boolean;
}

