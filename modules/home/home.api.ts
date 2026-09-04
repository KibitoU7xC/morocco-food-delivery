/**
 * Home API Module
 * Implements endpoints documented in Food Delivery App - APis.pdf:
 * - GET /api/v1/restaurants (Restaurants & Beloved Brands listing)
 * - GET /api/v1/restaurants/categories (Cuisine categories)
 */

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import {
  RestaurantBrand,
  RestaurantsApiResponse,
  RestaurantCategoriesApiResponse,
  CategoryOption,
} from './home.types';

/**
 * Fetch Beloved Restaurant Brands directly from backend API:
 * GET /api/v1/restaurants
 *
 * Exclusively uses dynamic API data. Returns empty array if none found or error occurs.
 */
export async function getBelovedBrands(
  categoryId?: number | null,
  categoryName?: string
): Promise<RestaurantBrand[]> {
  try {
    const params = new URLSearchParams();
    if (categoryId) {
      params.append('category_id', String(categoryId));
    }
    const queryString = params.toString() ? `?${params.toString()}` : '';
    const res = await apiClient<RestaurantsApiResponse>(`${API_ENDPOINTS.RESTAURANTS.LIST}${queryString}`);

    if (res && (res.status === true || res.success === true) && Array.isArray(res.data)) {
      const brands: RestaurantBrand[] = res.data.map((item) => {
        // Extract category name and image from backend category object if present
        const catObj =
          typeof item.category === 'object' && item.category !== null ? item.category : null;
        const catName =
          catObj?.name || (typeof item.category === 'string' && item.category ? item.category : 'Food');
        const catImageUrl = catObj?.image_url || catObj?.image || '';

        // Prioritize logo, then cover_image, then category image
        const imageUrl =
          item.logo && item.logo.startsWith('http')
            ? item.logo
            : item.cover_image && item.cover_image.startsWith('http')
              ? item.cover_image
              : catImageUrl.startsWith('http')
                ? catImageUrl
                : '';

        const catId = item.category_id ?? catObj?.id;

        return {
          id: item.id,
          name: item.name,
          slug: item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: item.description || `${catName} kitchen & menu`,
          category: catName,
          category_id: catId,
          image: imageUrl,
          rating: item.rating ?? 4.8,
          delivery_time:
            item.delivery_time ||
            (item.average_preparation_time ? `${item.average_preparation_time} min` : '20 min'),
          delivery_fee: item.delivery_fee ?? item.minimum_order_amount ?? 15,
          distance: item.distance || '2.0 km',
          is_featured: item.is_featured ?? 1,
          is_popular: item.is_popular ?? 1,
        };
      });

      // If categoryName was specified and not 'All', filter by it if categoryId wasn't passed
      if (categoryName && categoryName !== 'All' && !categoryId) {
        return brands.filter((b) =>
          b.category.toLowerCase().includes(categoryName.toLowerCase())
        );
      }

      return brands;
    }
  } catch (err) {
    console.warn('Failed to load restaurants from API:', err);
  }

  // Pure dynamic data: return empty array when no data or offline
  return [];
}

/**
 * Fetch Restaurant Categories dynamically from backend API:
 * GET /api/v1/restaurants/categories
 */
export async function getRestaurantCategories(): Promise<CategoryOption[]> {
  try {
    const res = await apiClient<RestaurantCategoriesApiResponse>(
      API_ENDPOINTS.RESTAURANTS.CATEGORIES
    );
    if (res && (res.status === true || res.success === true) && Array.isArray(res.data) && res.data.length > 0) {
      return [
        { id: null, name: 'All' },
        ...res.data.map((c) => ({ id: c.id, name: c.name })),
      ];
    }
  } catch (err) {
    console.warn('Failed to load restaurant categories from API:', err);
  }

  return [{ id: null, name: 'All' }];
}
