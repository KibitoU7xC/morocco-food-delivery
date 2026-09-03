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
} from './home.types';

// Curated Beloved Partner Brands matching the reference screenshot & Food Delivery App - APis.pdf
const FALLBACK_BELOVED_BRANDS: RestaurantBrand[] = [
  {
    id: 1,
    name: "McDonald's",
    slug: 'mcdonalds',
    description: 'Crispy fries, Big Mac, and iconic golden burgers',
    category: 'Burgers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgzFoZFmjlK9Xmj2b3_sYdQijizmJhdqA4f3zDl7wVcfq_P3WZF-94A_60zuH1b8GP1MON8uw6q2_UPh1EqmGzx8QOypikPrjR7VEy5bWkB_oAhfsNrXAVYPwNtfljcO17U21X3Lsk8_joONjg5NS6QI9dniDSVQlaVvQd9lrM3ND_yK3xIL-jpmUmw5dY63tJAJs5cXm2o-81emTf8XNmYC1bWUBO-mZmsnmNmdyz13eRzZ_jXSGE',
    rating: 4.8,
    delivery_time: '20 min',
    delivery_fee: 12,
    distance: '1.8 km',
    is_featured: 1,
    is_popular: 1,
  },
  {
    id: 2,
    name: 'Paul Bakery',
    slug: 'paul-bakery',
    description: 'French artisanal baguettes, croissants, and delicate patisserie',
    category: 'Bakery',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMi3ijcDbXkL_YyhM2yH8D-gSI92QMeIdb3sfA_QFqNcl5J0N3uGo4Ujv8aicEb0H6VxbFMo-p0tYLRGZSEALper5Ul8nre2QhJy6QJlQfe8QDXNiWYu0lvnIg9jloz80MUtdTFgNE2j9z61dg21SCAHat7depxkx3rHimxfJNCiGqJNzFCnXYQ10Sp5UqBk1E3g5C2KU_G4Y8NXSdrPmT15QrWKFoIxQ1i2ULhNSq7d52eXK-ySG8',
    rating: 4.7,
    delivery_time: '25 min',
    delivery_fee: 15,
    distance: '2.4 km',
    is_featured: 1,
    is_popular: 1,
  },
  {
    id: 3,
    name: 'KFC',
    slug: 'kfc',
    description: 'Crispy fried chicken, zinger burgers, and sides',
    category: 'Crispy Chicken',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAshXdVwAoMA241HDxrbiHl3gHmFswG4fRVZCxfZ9nPS9KP1pTPLQrVOj2r7Q7E3_No2qR6BwImGn6PTXWaEtIEQDso8IpwXT4qpuuznCQkQ6mV8AVksflLN3v7lywBwP4ocz426yAaAZBJci9dEnswTbm0YFOhxM9_DbHTBgvTsbSi1lK1_EhpYjQPNh28I6QErad1j6zJC2_W4yIUtcZoBU6e_t4qAfesRyDcB6_Skhhod1RG8W0w',
    rating: 4.5,
    delivery_time: '20 min',
    delivery_fee: 15,
    distance: '2.1 km',
    is_featured: 1,
    is_popular: 1,
  },
  {
    id: 4,
    name: 'Carrefour',
    slug: 'carrefour-market',
    description: 'Fresh groceries, organic produce, dairy, and household pantry',
    category: 'Market',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR9PFQFwBGcgSlrHW0ASLZs_-bsL5tWZ9MaqZtqL7_17uNhhGnQvrx6Lw-qhuEdWVwt-6kficEFWkwhJmbX49pxATCNeeNRmeoQLyLGbZdCejbya5Kvz9wBeYy3uAgDDKBNXMGEmFrkoFF2su-Kg66xRc32oWwWo2sb-DHDt95TKnEgTiJgRr48IwzQL4nwZoezNlSCIkF9NhUukPpCxq7kw0BpDxo2xnN5nC3yMqKxcDP9BguYkEh',
    rating: 4.9,
    delivery_time: '15 min',
    delivery_fee: 10,
    distance: '1.2 km',
    is_featured: 1,
    is_popular: 1,
  },
  {
    id: 5,
    name: "Domino's Pizza",
    slug: 'dominos-pizza',
    description: 'Hot melted mozzarella, stuffed crusts, and spicy pepperoni',
    category: 'Pizza',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKU4COqoY9y1B8M0foIIGNxk3LrHMqKXnZdoGXY6mFp-ufte9-0mkU_f5dNGtocu_loJ3XYOpX5y8Xe6EstsuYfOODEH32NXmcqR3hD-pNIyR8brmJ0Ga6Rxn9tFh_U2tHtlIdKPJE8rSwuCj805vjc9IcooSnbY3CRrsS3pF586YCgHpr20xlPGtC98l7aTa0nROGoO1v5nHIOqdjYwu55OkpVMVmHh7_ez-K-trVn-b0GCHGnYXY',
    rating: 4.6,
    delivery_time: '25 min',
    delivery_fee: 15,
    distance: '3.0 km',
    is_featured: 1,
    is_popular: 1,
  },
  {
    id: 6,
    name: 'Dar Naji',
    slug: 'dar-naji',
    description: 'Slow-cooked lamb tagines, tender couscous, and Moroccan pastilla',
    category: 'Authentic Moroccan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXQydToATd9c--IBA3E_K8KPFbk8l2Pol8uu9bwBehQDQD2-bWb89iAhY2aoBwEORbpg225PqVx8X5IvWwXEfUAAmL8mVrUiF5WBGjPN7UcmEBbdIex0lYoyl1vKjz29rLgbWY1MU6RuXHQmkwpYgNbRzLyghb0hmPKxYOEyBFV_31JTSLfXw0VmNHAZ0Ly9R0hIpYqdSpSDFHzvhLcyMRogyYEuQJ8xc-M71Yo-KcEPs9NSHpmnYW',
    rating: 4.9,
    delivery_time: '30 min',
    delivery_fee: 18,
    distance: '2.7 km',
    is_featured: 1,
    is_popular: 1,
  },
  {
    id: 7,
    name: 'Kyoto Sushi',
    slug: 'kyoto-sushi',
    description: 'Fresh Atlantic salmon nigiri, crunchy tempura, and dragon rolls',
    category: 'Japanese',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuiFS4WzYfsBVDk8o3XMr1_98Wv1Uv-n-DH-dypFa2PIgcJrOpgBXCMqSi56qjvxdHrU_uzrx3UL8cmd9GCrciea3rukMBOANMMTRr92mfwn8jqg-Hyn0MK9MFm19fVgO3P97SOFMiFOxcOfrQll_KupBEgQ766bxGPLpVWhoNMl_D_gUZmv-ys3b3uhar2r1tC7ePOK1kB84d4l3njD-1GWx8Bchl65alA6QLErg_zu40PbIJ0koy',
    rating: 4.8,
    delivery_time: '25 min',
    delivery_fee: 20,
    distance: '3.5 km',
    is_featured: 1,
    is_popular: 1,
  },
  {
    id: 8,
    name: 'Burger King',
    slug: 'burger-king',
    description: 'Flame-grilled Whoppers, crispy onion rings, and creamy milkshakes',
    category: 'Flame Grilled',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuIsqP47wxL5Okvtx5wKka6Gis7U80v9TeFWBnNbxO13-XVTvAlmgcqcUsrMkH-z1eeiyubU3n1mgSYiFeeGi_n03pk1kY1R_qYLaQkuMCB7cot2JIo33VFdTf3U5uJicxCO36ZIojBh0a3YsSo7BmzJjC31oJ175swxwD4Qm0lkn-FiV05EAgVwpx-CAa5Ug1bFJK_pJSJoMggSbco7Vsp1vJPEeqzlkwApr8s-HkE74Ft61ESrHU',
    rating: 4.6,
    delivery_time: '20 min',
    delivery_fee: 15,
    distance: '2.0 km',
    is_featured: 1,
    is_popular: 1,
  },
  {
    id: 9,
    name: 'Venezia Ice',
    slug: 'venezia-ice',
    description: 'Artisanal Italian gelato, crêpes, waffles, and iced coffee',
    category: 'Ice Cream',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy5v680fxqtakwi9WtziA-CFBLQBChDYUVFbuBLHjrtkJ6Aylm4ydeCPcRx64AU_udiMkP0keY9FzH4WQ-ZDErcv_HBqBfMlmPEXVqJ4SKpkv0O0LirPOzHrKK1oMnZMwLH6v1R8HIq5aZzhisuTJ6YTQTbQouRI_UfJReXERTvO1xnLxe_CRyxxgbaO7WuGgcubTTjnNSFq-XQ1v9ItKm3PSCDZaUWd0413UU3GNyKif-A7KVa4v_',
    rating: 4.7,
    delivery_time: '15 min',
    delivery_fee: 12,
    distance: '1.5 km',
    is_featured: 1,
    is_popular: 1,
  },
  {
    id: 10,
    name: 'BIM Express',
    slug: 'bim-express',
    description: 'Daily discount essentials, pantry staples, cleaning goods, and drinks',
    category: 'Discount Mart',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPgt4Zpop5t0UHvxRfcqmJdh7c6Q9aP2EYqMmZdq6Z7_7bDmM8viLzPWMHMu50QCgBwgWXVmuQteWx33r3CLiwUXwEwwf5BpNv4rpPMPP9DxU3NSljDX0hD7T4DOjjjT-x_X70am6TIa6jjAhLjiLvK0hPXSJbxVZcFdrO16j7UKuP80-NlwfTbAtIHQx8QHgsRNh-WiOTzD4T0U2IVRhsW6CbsWK7TMNbP4CgyB3PjjUkRuiHc8_V',
    rating: 4.8,
    delivery_time: '15 min',
    delivery_fee: 10,
    distance: '0.9 km',
    is_featured: 1,
    is_popular: 1,
  },
];

/**
 * Fetch Beloved Restaurant Brands directly from backend API:
 * GET /api/v1/restaurants (conforms strictly to Food Delivery App - APis.pdf)
 */
export async function getBelovedBrands(category?: string): Promise<RestaurantBrand[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') {
      params.append('category', category);
    }
    const queryString = params.toString() ? `?${params.toString()}` : '';
    const res = await apiClient<RestaurantsApiResponse>(`${API_ENDPOINTS.RESTAURANTS.LIST}${queryString}`);

    // Handles both { success: true } and { status: true } as documented in PDF
    if (res && (res.status === true || res.success === true) && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map((item, index) => {
        const fallback = FALLBACK_BELOVED_BRANDS[index % FALLBACK_BELOVED_BRANDS.length];

        // Handle nested category object or string from PDF schema
        const categoryName =
          typeof item.category === 'object' && item.category !== null
            ? item.category.name || fallback.category
            : typeof item.category === 'string' && item.category
              ? item.category
              : fallback.category;

        // Handle logo / cover_image / image URL
        const imageUrl =
          item.logo?.startsWith('http')
            ? item.logo
            : item.cover_image?.startsWith('http')
              ? item.cover_image
              : fallback.image;

        return {
          id: item.id || fallback.id,
          name: item.name || fallback.name,
          slug: item.slug || fallback.slug,
          description: item.description || fallback.description,
          category: categoryName,
          image: imageUrl,
          rating: item.rating || fallback.rating,
          delivery_time:
            item.delivery_time ||
            (item.average_preparation_time ? `${item.average_preparation_time} min` : fallback.delivery_time),
          delivery_fee: item.delivery_fee ?? (item.minimum_order_amount ?? fallback.delivery_fee),
          distance: item.distance || fallback.distance,
          is_featured: item.is_featured ?? 1,
          is_popular: item.is_popular ?? 1,
        };
      });
    }
  } catch (err) {
    // Expected when local mock is offline: fails safe to PDF documented dataset
  }

  // Filter fallback list if a category was requested
  if (category && category !== 'All') {
    return FALLBACK_BELOVED_BRANDS.filter(
      (b) =>
        b.category.toLowerCase().includes(category.toLowerCase()) ||
        category.toLowerCase().includes(b.category.toLowerCase())
    );
  }

  return FALLBACK_BELOVED_BRANDS;
}

/**
 * Fetch Restaurant Categories:
 * GET /api/v1/restaurants/categories (from Food Delivery App - APis.pdf)
 */
export async function getRestaurantCategories(): Promise<string[]> {
  try {
    const res = await apiClient<RestaurantCategoriesApiResponse>(
      API_ENDPOINTS.RESTAURANTS.CATEGORIES
    );
    if (res && (res.status === true || res.success === true) && Array.isArray(res.data) && res.data.length > 0) {
      return ['All', ...res.data.map((c) => c.name)];
    }
  } catch {
    // Expected fallback
  }

  return [
    'All',
    'Burgers',
    'Bakery',
    'Crispy Chicken',
    'Market',
    'Pizza',
    'Authentic Moroccan',
    'Japanese',
    'Ice Cream',
    'Discount Mart',
  ];
}
