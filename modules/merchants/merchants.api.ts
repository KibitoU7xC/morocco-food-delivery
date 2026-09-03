/**
 * Merchants API Module (Multi-Vendor Marketplace)
 * 
 * Endpoints:
 * - GET /api/v1/merchants/categories
 *   List of merchant parent categories: Groceries, Food, Shops, etc.
 * 
 * - GET /api/v1/merchants/by-category/{category_id}
 *   Vendors belonging to a category (e.g. Well Mart in Shops)
 * 
 * - GET /api/v1/merchants/{merchant_id}/product-categories
 *   Sub-departments of a merchant (e.g. Electronics, Home, Pets, Flowers)
 * 
 * - GET /api/v1/merchants/{merchant_id}/product-categories/{category_id}/products
 *   Products catalog of a vendor under a category
 */

export {};
