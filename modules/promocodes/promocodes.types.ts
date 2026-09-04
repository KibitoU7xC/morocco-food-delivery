/**
 * Promo Codes Types
 */

export interface PromoCode {
  id: number;
  code: string;
  title: string;
  description: string | null;
  status: "active" | "inactive";
  discount_type: "fixed" | "percentage";
  discount_value: number;
  max_discount_amount: number | null;
  target_scope: "all" | "restaurant" | string;
  target_ids?: string[] | null;
  order_types?: string[];
  min_order_amount: number;
  min_order_count?: number;
  total_usage_limit: number;
  total_used: number;
  per_user_limit: number;
  user_eligibility: string;
  eligible_customer_ids?: number[] | null;
  start_date: string;
  end_date: string;
  applicable_days?: string[];
  time_slot_start?: string | null;
  time_slot_end?: string | null;
}

export interface ApplyPromoRequest {
  code: string;
}

export interface ApplyPromoResponse {
  promo_code: PromoCode;
  subtotal: number;
  discount_amount: number;
}
