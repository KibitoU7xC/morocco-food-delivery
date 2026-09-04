/**
 * Customer Wallet API Module (Moroccan Dirham - MAD)
 *
 * Endpoints:
 * - GET /api/v1/customer/wallet
 *   Verified live 2026-09-04, Bearer auth required:
 *   { success, message, data: { balance, formatted_balance, currency } }
 *
 * - GET /api/v1/customer/wallet/transactions
 * - POST /api/v1/customer/wallet/recharge
 *   (not used by the checkout screen — wallet is only shown as a payment option there)
 */

import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/types/common";
import type { WalletData } from "./wallet.types";

export async function getWallet(): Promise<WalletData> {
  const res = await apiClient<ApiResponse<WalletData>>(
    API_ENDPOINTS.CUSTOMER.WALLET,
  );
  return res.data;
}
