/**
 * Customer Wallet Types
 */

export interface WalletData {
  balance: number;
  formatted_balance: string;
  currency: 'MAD' | string;
}

export interface WalletTransaction {
  id: number;
  wallet_id: number;
  type: 'credit' | 'debit';
  amount: string;
  description: string;
  reference_id?: string;
  created_at: string;
}

export interface RechargeWalletRequest {
  amount: number;
}
