/**
 * Auth Types
 * Type contracts for Send OTP, Verify OTP, Register, and Session
 */

export interface SendOtpRequest {
  mobile: string;
}

export interface VerifyOtpRequest {
  mobile: string;
  otp: string;
  fcm_token?: string;
  device_type?: 'android' | 'ios' | 'web';
}

export interface RegisterRequest {
  name: string;
  mobile: string;
  email: string;
  country_code: string;
}

export interface AuthSession {
  token: string;
  customer: {
    id: number;
    customer_code: string;
    name: string;
    email: string;
    mobile: string;
    country_code: string;
    is_active: boolean;
    created_at: string;
  };
}
