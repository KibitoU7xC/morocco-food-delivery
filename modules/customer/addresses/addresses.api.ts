/**
 * Customer Addresses API Module
 *
 * Endpoints (verified live 2026-09-04, all require a Bearer token):
 * - GET    /api/v1/customer/addresses            -> { status, message, data: CustomerAddress[] }
 * - POST   /api/v1/customer/addresses             -> { status, message, data: CustomerAddress }
 * - PUT    /api/v1/customer/addresses/{id}        -> { status, message, data: CustomerAddress }
 * - DELETE /api/v1/customer/addresses/{id}        -> { status, message }
 */

import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/common";
import type {
  CustomerAddress,
  CreateAddressRequest,
  UpdateAddressRequest,
} from "./addresses.types";

export async function getAddresses(): Promise<CustomerAddress[]> {
  const res = await apiClient<ApiResponse<CustomerAddress[]>>(
    API_ENDPOINTS.CUSTOMER.ADDRESSES,
  );
  return res.data ?? [];
}

export async function createAddress(
  payload: CreateAddressRequest,
): Promise<CustomerAddress> {
  const res = await apiClient<ApiResponse<CustomerAddress>>(
    API_ENDPOINTS.CUSTOMER.ADDRESSES,
    { method: "POST", data: payload },
  );
  return res.data;
}

export async function updateAddress(
  id: number,
  payload: UpdateAddressRequest,
): Promise<CustomerAddress> {
  const res = await apiClient<ApiResponse<CustomerAddress>>(
    API_ENDPOINTS.CUSTOMER.ADDRESS_DETAILS(id),
    { method: "PUT", data: payload },
  );
  return res.data;
}

export async function deleteAddress(id: number): Promise<void> {
  await apiClient<ApiResponse<null>>(API_ENDPOINTS.CUSTOMER.ADDRESS_DETAILS(id), {
    method: "DELETE",
  });
}
