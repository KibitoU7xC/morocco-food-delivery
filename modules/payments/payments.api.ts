/**
 * Payment Methods API Module
 *
 * Endpoints:
 * - GET /api/v1/payment-methods
 *   Verified live 2026-09-04, no auth required: { status, message, data: PaymentMethod[] }
 *   Currently returns the accepted payment TYPES (e.g. Cash On Delivery, Wallet) —
 *   not a customer's saved cards. There's no documented endpoint for saved/stored
 *   payment instruments, so the profile dashboard lists these as accepted methods
 *   rather than "your cards".
 */

import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/common";
import type { PaymentMethod } from "./payments.types";

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const res = await apiClient<ApiResponse<PaymentMethod[]>>(
    API_ENDPOINTS.PAYMENTS.METHODS,
  );
  return (res.data ?? [])
    .filter((method) => method.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
}
