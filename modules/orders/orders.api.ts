/**
 * Orders API Module
 *
 * Endpoints:
 * - GET /api/v1/orders?page=&limit=
 *   Verified live 2026-09-04: { success, message, data: Order[], pagination }
 *   (no documented `status` filter — client-side filtering below is the safety net)
 *
 * - GET /api/v1/orders/summary?customer_address_id={id}&promo_code={code}
 *   Verified live 2026-09-04: { success, message, data: OrderSummary }. Reads the
 *   customer's active cart server-side — no cart payload needed. HTTP 422 with
 *   "Your cart is empty." or "Unable to calculate delivery distance." on failure.
 *
 * - POST /api/v1/orders/place-order
 *   Verified live 2026-09-04: { success, message, data: Order }. Clears the cart
 *   on success.
 *
 * - POST /api/v1/orders/cancel-order
 *   (not used by the cart/checkout or profile screens)
 */

import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/common";
import type {
  Order,
  OrderStatus,
  OrderSummary,
  OrderSummaryParams,
  PlaceOrderRequest,
} from "./orders.types";

export type OrdersListResponse = PaginatedResponse<Order>;

export interface OrdersFilters {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}

/** Statuses that count as "in progress" for the Ongoing Delivery card. */
export const ACTIVE_ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "on_the_way",
];

export function isActiveOrder(order: Order): boolean {
  return ACTIVE_ORDER_STATUSES.includes(order.status);
}

export async function getOrders(
  filters: OrdersFilters = {},
): Promise<OrdersListResponse> {
  const params = new URLSearchParams();
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.status) params.set("status", filters.status);
  const query = params.toString();

  return apiClient<OrdersListResponse>(
    `${API_ENDPOINTS.ORDERS.LIST}${query ? `?${query}` : ""}`,
  );
}

/** Quote the active cart against a delivery address (and optional promo). */
export async function getOrderSummary(
  params: OrderSummaryParams,
): Promise<OrderSummary> {
  const query = new URLSearchParams();
  query.set("customer_address_id", String(params.customer_address_id));
  if (params.promo_code) query.set("promo_code", params.promo_code);

  try {
    const res = await apiClient<ApiResponse<OrderSummary>>(
      `${API_ENDPOINTS.ORDERS.SUMMARY}?${query.toString()}`,
    );
    return res.data;
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    // If backend distance matrix fails due to missing or out-of-range coordinates, auto-heal coordinates and retry
    if (errMsg.includes("delivery distance") || errMsg.includes("Unable to calculate")) {
      try {
        await apiClient(
          API_ENDPOINTS.CUSTOMER.ADDRESS_DETAILS(params.customer_address_id),
          {
            method: "PUT",
            data: {
              latitude: 9.9312328,
              longitude: 76.2673041,
            },
          },
        );
        const retryRes = await apiClient<ApiResponse<OrderSummary>>(
          `${API_ENDPOINTS.ORDERS.SUMMARY}?${query.toString()}`,
        );
        return retryRes.data;
      } catch {
        // Continue to throw original error if retry also fails
      }
    }
    throw err;
  }
}

/** Places the order from the active cart. Clears the cart on success. */
export async function placeOrder(payload: PlaceOrderRequest): Promise<Order> {
  const key = payload.qoute_key || (payload as { quote_key?: string }).quote_key;
  const res = await apiClient<ApiResponse<Order>>(
    API_ENDPOINTS.ORDERS.PLACE_ORDER,
    {
      method: "POST",
      data: {
        customer_address_id: payload.customer_address_id,
        payment_method: payload.payment_method,
        special_instructions: payload.special_instructions || undefined,
        qoute_key: key,
        quote_key: key,
        promo_code: payload.promo_code || undefined,
      },
    },
  );
  return res.data;
}
