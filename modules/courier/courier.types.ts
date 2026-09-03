/**
 * Courier / Express Delivery Types
 */

export interface DistanceMatrixData {
  distance: number; // in kilometers
  duration: number; // in minutes
  quote_key: string;
}

export interface PriceRuleData {
  id: number;
  name: string;
  code: string;
  description: string;
  vehicle_id: number;
  restaurant_id: number | null;
  is_default: number | boolean;
  start_distance: string;
  end_distance: string;
  base_price: string;
  extra_distance: string;
  extra_price: string;
  is_active: number | boolean;
  priority: number;
}

export interface CourierOrderRequest {
  pickup_address_id?: number;
  customer_address_id: number; // delivery address
  vehicle_type?: 'bike' | 'scooter' | 'van';
  package_type?: 'document' | 'parcel' | 'fragile' | 'food';
  package_description?: string;
  payment_method: 'cod' | 'stripe' | 'wallet';
  qoute_key: string;
  special_instructions?: string;
}
