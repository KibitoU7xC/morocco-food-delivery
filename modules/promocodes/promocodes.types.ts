/**
 * Promo Codes Types
 */

export interface PromoCode {
  id: number;
  code: string;
  title: string;
  description: string | null;
  status: 'active' | 'inactive';
  discount_type: 'fixed' | 'percentage';
  discount_value: number;
  max_discount_amount: number | null;
  target_scope: string;
  min_order_amount: number;
  total_usage_limit: number;
  total_used: number;
  per_user_limit: number;
  user_eligibility: string;
  start_date: string;
  end_date: string;
}

export interface ApplyPromoResponse {
  promo_code: PromoCode;
  subtotal: number;
  discount_amount: number;
}
