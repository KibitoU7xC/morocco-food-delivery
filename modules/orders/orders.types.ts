/**
 * Orders Types
 */

export interface OrderItem {
  id: number;
  product_id: number;
  product_variant_id: number | null;
  product_name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
  special_instructions: string | null;
}

export interface OrderBreakdown {
  subtotal: number;
  discount_amount: number;
  delivery_fee: number;
  tax_amount: number;
  commission_amount?: number;
  total_payable: number;
}

export interface OrderSummary {
  restaurant: {
    id: number;
    name: string;
    address?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount_amount: number;
  delivery_fee: number;
  total_amount: number;
  estimated_delivery_time?: number;
  applied_promo?: object;
  price_rule_data?: object;
}

export interface PlaceOrderRequest {
  customer_address_id: number;
  payment_method: "cod" | "stripe" | "wallet";
  special_instructions?: string;
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
 * Order (list) record. Fields beyond id/order_number/status/total_amount/created_at
 * are marked optional — GET /api/v1/orders currently returns no populated orders
 * on any test account we have access to, so this list shape is documented but not
 * yet observed live. Render defensively; don't assume every field is present.
 */
export interface Order {
  id: number;
  order_number: string;
  customer_id?: number;
  customer_address_id?: number;
  restaurant_id?: number;
  restaurant_name?: string;
  status: OrderStatus;
  payment_status?: "pending" | "paid" | "failed";
  payment_method?: string;
  subtotal?: string | number;
  delivery_fee?: string | number;
  discount_amount?: string | number;
  total_amount: string | number;
  delivery_address?: string;
  delivery_latitude?: string | number;
  delivery_longitude?: string | number;
  estimated_delivery_time?: string | number | null;
  created_at: string;
  updated_at?: string;
}
