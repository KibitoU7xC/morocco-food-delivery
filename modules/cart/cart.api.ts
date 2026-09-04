/**
 * Cart API Module
 *
 * Endpoints (verified live 2026-09-04, Bearer auth required):
 * - GET /api/v1/cart
 *   { success, message, data: Cart | null } — `null` when the customer has
 *   never had a cart; once a cart exists, an empty one comes back as
 *   { ..., items: [], restaurant: null } instead of `null` again.
 * - POST /api/v1/cart/add            { product_id, product_variant_id?, quantity, special_instructions? }
 * - PUT  /api/v1/cart/update/{itemId} { quantity }
 * - DELETE /api/v1/cart/delete/{itemId}
 * All three mutation endpoints return the full updated cart as `data`.
 */

import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/common";
import type { AddToCartRequest, Cart } from "./cart.types";

export async function getCart(): Promise<Cart | null> {
  const res = await apiClient<ApiResponse<Cart | null>>(API_ENDPOINTS.CART.GET);
  return res.data;
}

export async function addToCart(payload: AddToCartRequest): Promise<Cart> {
  const res = await apiClient<ApiResponse<Cart>>(API_ENDPOINTS.CART.ADD, {
    method: "POST",
    data: payload,
  });
  return res.data;
}

export async function updateCartItem(
  itemId: number,
  quantity: number,
): Promise<Cart> {
  const res = await apiClient<ApiResponse<Cart>>(
    API_ENDPOINTS.CART.UPDATE(itemId),
    { method: "PUT", data: { quantity } },
  );
  return res.data;
}

export async function removeCartItem(itemId: number): Promise<Cart> {
  const res = await apiClient<ApiResponse<Cart>>(
    API_ENDPOINTS.CART.DELETE(itemId),
    { method: "DELETE" },
  );
  return res.data;
}

/** True when a cart has no items — covers both `null` and the empty-record shape. */
export function isCartEmpty(cart: Cart | null): boolean {
  return !cart || cart.items.length === 0;
}
