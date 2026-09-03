/**
 * Payment Methods Types
 */

export interface PaymentMethod {
  id: number;
  name: string;
  code: 'cod' | 'stripe' | 'wallet' | string;
  description: string;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
}
