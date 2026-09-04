"use client";

/**
 * Customer Wallet Hooks
 */

import { useEffect, useState } from "react";
import { getWallet } from "./wallet.api";
import type { WalletData } from "./wallet.types";

/** @param enabled Only fetch once the caller knows the customer is signed in. */
export function useWallet(enabled: boolean): {
  wallet: WalletData | null;
  isLoading: boolean;
} {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setIsLoading(true);
    getWallet()
      .then((data) => {
        if (!cancelled) setWallet(data);
      })
      .catch(() => {
        // wallet balance is a nice-to-have on this page; fail silently
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { wallet, isLoading };
}
