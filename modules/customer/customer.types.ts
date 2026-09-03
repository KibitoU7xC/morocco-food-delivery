/**
 * Customer Profile Types
 */

export interface CustomerProfile {
  id: number;
  customer_code: string;
  name: string;
  email: string;
  mobile: string;
  country_code: string;
  is_active: boolean;
  created_at: string;
}

export interface UpdateProfileRequest {
  name: string;
  mobile: string;
}
