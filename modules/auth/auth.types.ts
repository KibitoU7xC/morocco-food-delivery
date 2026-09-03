/**
 * Auth Types
 * Type contracts for Send OTP, Verify OTP, Register, and Session based on Food Delivery App - APis.pdf
 */

export interface SendOtpRequest {
  mobile: string;
}

export interface SendOtpResponse {
  status: boolean;
  message: string;
  otp?: string;
}

export interface VerifyOtpRequest {
  mobile: string;
  otp: string;
  fcm_token?: string;
  device_type?: 'android' | 'ios' | 'web';
}

export interface CustomerData {
  id: number;
  customer_code?: string;
  name: string;
  email: string;
  mobile: string;
  country_code: string;
  is_active: boolean;
  created_at: string;
}

export interface VerifyOtpResponse {
  status: boolean;
  message: string;
  token?: string;
  customer?: CustomerData;
  data?: CustomerData;
  is_new_user?: boolean;
}

export interface RegisterRequest {
  name: string;
  mobile: string;
  email: string;
  country_code: string;
}

export interface RegisterResponse {
  status: boolean;
  message: string;
  token?: string;
  customer?: CustomerData;
  data?: CustomerData;
}
