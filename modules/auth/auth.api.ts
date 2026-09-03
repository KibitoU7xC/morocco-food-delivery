/**
 * Auth API Module
 * 
 * Endpoints:
 * - POST /api/v1/auth/send-otp
 *   Payload: { mobile: string }
 *   Response: { status: boolean, message: string, otp?: string }
 * 
 * - POST /api/v1/auth/verify-otp
 *   Payload: { mobile: string, otp: string, fcm_token: string, device_type: string }
 *   Response: { status: boolean, message: string, token?: string, customer?: object }
 * 
 * - POST /api/v1/auth/register
 *   Payload: { name: string, mobile: string, email: string, country_code: string }
 *   Response: Customer registration data & auth token
 */

export {};
