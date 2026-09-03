/**
 * API Endpoints Constants
 * Central registry mapping all backend endpoints across the Morocco Food & Multi-Service Delivery platform.
 */

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    SEND_OTP: '/api/v1/auth/send-otp',
    VERIFY_OTP: '/api/v1/auth/verify-otp',
    REGISTER: '/api/v1/auth/register',
  },

  // Customer Profile & Data
  CUSTOMER: {
    PROFILE: '/api/v1/customer/profile',
    ADDRESSES: '/api/v1/customer/addresses',
    WISHLIST: '/api/v1/customer/wishlist',
    WISHLIST_TOGGLE: '/api/v1/customer/wishlist/toggle',
    WALLET: '/api/v1/customer/wallet',
    WALLET_TRANSACTIONS: '/api/v1/customer/wallet/transactions',
    WALLET_RECHARGE: '/api/v1/customer/wallet/recharge',
  },

  // Banners
  BANNERS: {
    MOBILE_BANNERS: '/api/v1/mobile-banners',
  },

  // Restaurants (Food Delivery)
  RESTAURANTS: {
    LIST: '/api/v1/restaurants',
    CATEGORIES: '/api/v1/restaurants/categories',
    DETAILS: (id: string | number) => `/api/v1/restaurants/${id}`,
    REVIEWS: (id: string | number) => `/api/v1/restaurants/${id}/reviews`,
  },

  // Merchants (Grocery, Pharmacy, Shops)
  MERCHANTS: {
    CATEGORIES: '/api/v1/merchants/categories',
    BY_CATEGORY: (categoryId: string | number) => `/api/v1/merchants/by-category/${categoryId}`,
    PRODUCT_CATEGORIES: (merchantId: string | number) => `/api/v1/merchants/${merchantId}/product-categories`,
    CATEGORY_PRODUCTS: (merchantId: string | number, categoryId: string | number) =>
      `/api/v1/merchants/${merchantId}/product-categories/${categoryId}/products`,
  },

  // Products
  PRODUCTS: {
    LIST: '/api/v1/products',
    CATEGORIES: '/api/v1/products/categories',
    DETAILS: (id: string | number) => `/api/v1/products/${id}`,
    BY_RESTAURANT: (restaurantId: string | number) => `/api/v1/products/restaurant/${restaurantId}`,
  },

  // Cart
  CART: {
    GET: '/api/v1/cart',
    ADD: '/api/v1/cart/add',
    UPDATE: (itemId: string | number) => `/api/v1/cart/update/${itemId}`,
    DELETE: (itemId: string | number) => `/api/v1/cart/delete/${itemId}`,
  },

  // Orders & Courier / Express
  ORDERS: {
    LIST: '/api/v1/orders',
    SUMMARY: '/api/v1/orders/summary',
    PLACE_ORDER: '/api/v1/orders/place-order',
    CANCEL_ORDER: '/api/v1/orders/cancel-order',
  },

  // Promo Codes
  PROMOCODES: {
    LIST: '/api/v1/promocodes',
    APPLY: '/api/v1/promocodes/apply',
  },

  // Payment Methods
  PAYMENTS: {
    METHODS: '/api/v1/payment-methods',
  },

  // Reviews
  REVIEWS: {
    SUBMIT: '/api/v1/reviews',
    PENDING: '/api/v1/reviews/pending',
    BY_RESTAURANT: (restaurantId: string | number) => `/api/v1/restaurants/${restaurantId}/reviews`,
  },

  // Help & Support Tickets
  SUPPORT: {
    HELP_SUPPORT: '/api/v1/help-support',
    TICKETS: '/api/v1/customer/tickets',
    TICKET_DETAILS: (id: string | number) => `/api/v1/customer/tickets/${id}`,
    TICKET_REPLY: (id: string | number) => `/api/v1/customer/tickets/${id}/reply`,
  },
} as const;
