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

const DEFAULT_SERVICE_LAT = 9.9312328;
const DEFAULT_SERVICE_LNG = 76.2673041;

export async function getAddresses(): Promise<CustomerAddress[]> {
  const res = await apiClient<ApiResponse<CustomerAddress[]>>(
    API_ENDPOINTS.CUSTOMER.ADDRESSES,
  );
  return res.data ?? [];
}

export async function createAddress(
  payload: CreateAddressRequest,
): Promise<CustomerAddress> {
  const lat = Number(payload.latitude);
  const lng = Number(payload.longitude);
  const safePayload = {
    ...payload,
    latitude: !isNaN(lat) && lat !== 0 ? lat : DEFAULT_SERVICE_LAT,
    longitude: !isNaN(lng) && lng !== 0 ? lng : DEFAULT_SERVICE_LNG,
  };

  const res = await apiClient<ApiResponse<CustomerAddress>>(
    API_ENDPOINTS.CUSTOMER.ADDRESSES,
    { method: "POST", data: safePayload },
  );
  return res.data;
}

export async function updateAddress(
  id: number,
  payload: UpdateAddressRequest,
): Promise<CustomerAddress> {
  const lat = Number(payload.latitude);
  const lng = Number(payload.longitude);
  const safePayload = {
    ...payload,
    latitude: !isNaN(lat) && lat !== 0 ? lat : DEFAULT_SERVICE_LAT,
    longitude: !isNaN(lng) && lng !== 0 ? lng : DEFAULT_SERVICE_LNG,
  };

  const res = await apiClient<ApiResponse<CustomerAddress>>(
    API_ENDPOINTS.CUSTOMER.ADDRESS_DETAILS(id),
    { method: "PUT", data: safePayload },
  );
  return res.data;
}

export async function deleteAddress(id: number): Promise<void> {
  await apiClient<ApiResponse<null>>(API_ENDPOINTS.CUSTOMER.ADDRESS_DETAILS(id), {
    method: "DELETE",
  });
}
