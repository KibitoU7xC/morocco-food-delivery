/**
 * Promo Codes API Module
 *
 * Endpoints:
 * - GET /api/v1/promocodes — optional ?restaurant_id={id}
 * - POST /api/v1/promocodes/apply
 *   Payload: { code }
 *   Verified live 2026-09-04: success -> { success, message, data: ApplyPromoResponse };
 *   invalid/expired code -> HTTP 422 { success: false, message: "Invalid or expired promo code." }
 *   (apiClient throws on the 422, so callers just try/catch and show err.message).
 */

import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/common";
import type { ApplyPromoResponse, PromoCode } from "./promocodes.types";

export async function getPromoCodes(restaurantId?: number): Promise<PromoCode[]> {
  const query = restaurantId ? `?restaurant_id=${restaurantId}` : "";
  const res = await apiClient<ApiResponse<PromoCode[]>>(
    `${API_ENDPOINTS.PROMOCODES.LIST}${query}`,
  );
  return res.data ?? [];
}

export async function applyPromoCode(code: string): Promise<ApplyPromoResponse> {
  const res = await apiClient<ApiResponse<ApplyPromoResponse>>(
    API_ENDPOINTS.PROMOCODES.APPLY,
    { method: "POST", data: { code: code.trim() } },
  );
  return res.data;
}
