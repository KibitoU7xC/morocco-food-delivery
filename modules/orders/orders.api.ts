/**
 * Orders API Module
 *
 * Endpoints:
 * - GET /api/v1/orders?page=&limit=
 *   Verified live 2026-09-04: { success, message, data: Order[], pagination }
 *   (no documented `status` filter — client-side filtering below is the safety net)
 *
 * - GET /api/v1/orders/summary?customer_address_id={id}&quote_key={key}&promo_code={code}
 * - POST /api/v1/orders/place-order
 * - POST /api/v1/orders/cancel-order
 *   (checkout/cancellation flows — out of scope for the profile dashboard)
 */

import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { PaginatedResponse } from "@/types/common";
import type { Order, OrderStatus } from "./orders.types";

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
