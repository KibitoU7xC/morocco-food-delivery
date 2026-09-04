/**
 * Customer Profile API Module
 *
 * Endpoints (verified live 2026-09-04, require a Bearer token):
 * - GET /api/v1/customer/profile
 *   Response: { status, message, data: CustomerProfile }
 * - PUT /api/v1/customer/profile
 *   Payload: { name, mobile } -> Response: { status, message, data: CustomerProfile }
 *   (email is not editable through this endpoint — the API doesn't accept it)
 */

import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/common";
import type { CustomerProfile, UpdateProfileRequest } from "./customer.types";

export async function getCustomerProfile(): Promise<CustomerProfile> {
  const res = await apiClient<ApiResponse<CustomerProfile>>(
    API_ENDPOINTS.CUSTOMER.PROFILE,
  );
  return res.data;
}

export async function updateCustomerProfile(
  payload: UpdateProfileRequest,
): Promise<CustomerProfile> {
  const res = await apiClient<ApiResponse<CustomerProfile>>(
    API_ENDPOINTS.CUSTOMER.PROFILE,
    { method: "PUT", data: payload },
  );
  return res.data;
}
