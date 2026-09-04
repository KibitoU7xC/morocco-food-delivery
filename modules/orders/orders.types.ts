/**
 * Orders Types
 */

import type { PromoCode } from "../promocodes/promocodes.types";

export interface OrderItem {
  product_id: number;
  product_variant_id: number | null;
  product_name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
  special_instructions: string | null;
  track_inventory?: boolean;
}

export interface DistanceMatrixData {
  distance: number;
  duration: number;
  /** Pass this back as `qoute_key` on POST /orders/place-order. */
  quote_key: string;
}

export interface PriceRuleData {
  success: boolean;
  restaurant_id: number;
  customer_address_id: number;
  vehicle_id: number;
  distance_matrix_data: DistanceMatrixData;
  delivery_fee: number;
  currency: string;
}

/**
 * GET /api/v1/orders/summary response (verified live 2026-09-04). Computed
 * server-side from the customer's active cart + the given address — no
 * "service fee" / "packaging fee" / "eco-contribution" line items exist here,
 * despite some reference designs showing them. Fails with HTTP 422 when the
 * cart is empty ("Your cart is empty.") or when a distance can't be computed
 * ("Unable to calculate delivery distance.") — the latter is common with the
 * current seed data, whose restaurants have non-Moroccan coordinates.
 */
export interface OrderSummary {
  success: boolean;
  restaurant: {
    id: number;
    name: string;
    address?: string;
    city?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount_amount: number;
  applied_promo: PromoCode | null;
  delivery_fee: number;
  price_rule_data: PriceRuleData;
  tax_amount: number;
  commission_amount?: number;
  estimated_delivery_time?: number;
  total_amount: number;
}

export interface OrderSummaryParams {
  customer_address_id: number;
  promo_code?: string;
}

export type PaymentMethodCode = "cod" | "wallet" | "stripe" | string;

export interface PlaceOrderRequest {
  customer_address_id: number;
  payment_method: PaymentMethodCode;
  special_instructions?: string;
  /** From OrderSummary.price_rule_data.distance_matrix_data.quote_key */
  qoute_key?: string;
  promo_code?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "on_the_way"
  | "delivered"
  | "cancelled";

/**
 * Order (list/detail) record. Verified live 2026-09-04 by placing a real
 * order — `restaurant` (slim) and `payment_details.items` (with product
 * names) ARE present on both the list and the place-order response.
 */
export interface Order {
  id: number;
  order_number: string;
  customer_id?: number;
  customer_address_id?: number;
  restaurant_id?: number;
  restaurant?: { id: number; name: string };
  status: OrderStatus;
  payment_status?: "pending" | "paid" | "failed";
  payment_method?: string;
  payment_details?: {
    items?: OrderItem[];
    currency?: string;
    breakdown?: {
      subtotal: number;
      tax_amount: number;
      delivery_fee: number;
      total_payable: number;
      discount_amount: number;
      commission_amount?: number;
    };
  };
  subtotal?: string | number;
  delivery_fee?: string | number;
  discount_amount?: string | number;
  tax_amount?: string | number;
  total_amount: string | number;
  delivery_address?: string;
  delivery_latitude?: string | number;
  delivery_longitude?: string | number;
  estimated_delivery_time?: string | number | null;
  tracking_url?: string | null;
  created_at: string;
  updated_at?: string;
}
