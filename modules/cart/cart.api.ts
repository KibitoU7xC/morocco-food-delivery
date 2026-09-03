/**
 * Cart API Module
 * 
 * Endpoints:
 * - GET /api/v1/cart
 *   Retrieves active cart, items, variants, restaurant/vendor info, and price calculations
 * 
 * - POST /api/v1/cart/add
 *   Payload: { product_id: number, quantity: number, special_instructions?: string }
 * 
 * - PUT /api/v1/cart/update/{cart_item_id}
 *   Payload: { quantity: number }
 * 
 * - DELETE /api/v1/cart/delete/{cart_item_id}
 *   Removes item from cart
 */

export {};
