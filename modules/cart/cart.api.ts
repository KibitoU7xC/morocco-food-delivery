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

const productImageCache = new Map<number, string>();

/**
 * The backend GET /api/v1/cart endpoint returns cart items with product info,
 * but omits the product's primary_image relation. This helper dynamically
 * enriches cart items with their primary images from the product details API.
 */
async function enrichCartWithProductImages(cart: Cart | null): Promise<Cart | null> {
  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    return cart;
  }

  const missingProductIds = new Set<number>();
  for (const item of cart.items) {
    const existingImg =
      item.product?.primary_image?.image ||
      (item.product as unknown as { image?: string })?.image ||
      item.product?.images?.[0]?.image;

    if (existingImg) {
      productImageCache.set(item.product_id, existingImg);
    } else if (!productImageCache.has(item.product_id)) {
      missingProductIds.add(item.product_id);
    }
  }

  if (missingProductIds.size > 0) {
    await Promise.all(
      Array.from(missingProductIds).map(async (productId) => {
        try {
          const res = await apiClient<{
            success?: boolean;
            data?: {
              primary_image?: { image: string };
              images?: Array<{ image: string }>;
            };
          }>(API_ENDPOINTS.PRODUCTS.DETAILS(productId));

          const imgUrl = res?.data?.primary_image?.image || res?.data?.images?.[0]?.image;
          if (imgUrl) {
            productImageCache.set(productId, imgUrl);
          }
        } catch {
          // Gracefully continue
        }
      })
    );
  }

  for (const item of cart.items) {
    const cachedImg = productImageCache.get(item.product_id);
    if (cachedImg && item.product) {
      if (!item.product.primary_image) {
        item.product.primary_image = {
          id: 0,
          product_id: item.product_id,
          image: cachedImg,
          is_primary: true,
        };
      } else if (!item.product.primary_image.image) {
        item.product.primary_image.image = cachedImg;
      }
    }
  }

  return cart;
}

export async function getCart(): Promise<Cart | null> {
  const res = await apiClient<ApiResponse<Cart | null>>(API_ENDPOINTS.CART.GET);
  return enrichCartWithProductImages(res.data);
}

export async function addToCart(payload: AddToCartRequest): Promise<Cart> {
  const res = await apiClient<ApiResponse<Cart>>(API_ENDPOINTS.CART.ADD, {
    method: "POST",
    data: payload,
  });
  return (await enrichCartWithProductImages(res.data)) ?? res.data;
}

export async function updateCartItem(
  itemId: number,
  quantity: number,
): Promise<Cart> {
  const res = await apiClient<ApiResponse<Cart>>(
    API_ENDPOINTS.CART.UPDATE(itemId),
    { method: "PUT", data: { quantity } },
  );
  return (await enrichCartWithProductImages(res.data)) ?? res.data;
}

export async function removeCartItem(itemId: number): Promise<Cart> {
  const res = await apiClient<ApiResponse<Cart>>(
    API_ENDPOINTS.CART.DELETE(itemId),
    { method: "DELETE" },
  );
  return (await enrichCartWithProductImages(res.data)) ?? res.data;
}

/** True when a cart has no items — covers both `null` and the empty-record shape. */
export function isCartEmpty(cart: Cart | null): boolean {
  return !cart || cart.items.length === 0;
}
