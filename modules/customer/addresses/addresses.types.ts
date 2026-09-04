/**
 * Customer Addresses Types
 *
 * NOTE: `type` was verified against the live API (2026-09-04) — it only accepts
 * 'home' | 'apartment' | 'other'. 'work'/'office'/'business' are all rejected
 * with a validation error, even though some reference designs show an "Office"
 * address. Don't add those values back without re-checking the backend.
 */

export type AddressType = "home" | "apartment" | "other";

export interface CustomerAddress {
  id: number;
  customer_id?: number;
  type: AddressType;
  address_line_1: string;
  address_line_2: string | null;
  landmark: string | null;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  is_default: boolean | null;
  created_at: string;
  updated_at?: string;
}

export interface CreateAddressRequest {
  type: AddressType;
  address_line_1: string;
  address_line_2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  is_default?: boolean;
}

export type UpdateAddressRequest = Partial<CreateAddressRequest>;
