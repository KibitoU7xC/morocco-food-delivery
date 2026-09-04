"use client";

/**
 * Promo Codes Hooks
 * Coupon box state for the Cart & Checkout page: apply validates the code via
 * POST /promocodes/apply for immediate feedback; the checkout orchestrator
 * then re-fetches the order summary with `promo_code` set so the bill total
 * reflects the discount.
 */

import { useCallback, useEffect, useState } from "react";
import { applyPromoCode, getPromoCodes } from "./promocodes.api";
import type { ApplyPromoResponse, PromoCode } from "./promocodes.types";

interface UsePromoCodeResult {
  appliedCode: string | null;
  result: ApplyPromoResponse | null;
  isApplying: boolean;
  error: string | null;
  availableCodes: PromoCode[];
  isLoadingCodes: boolean;
  apply: (code: string) => Promise<boolean>;
  remove: () => void;
  refreshCodes: () => void;
}

export function usePromoCode(restaurantId?: number): UsePromoCodeResult {
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [result, setResult] = useState<ApplyPromoResponse | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableCodes, setAvailableCodes] = useState<PromoCode[]>([]);
  const [isLoadingCodes, setIsLoadingCodes] = useState(true);

  const loadCodes = useCallback(async () => {
    setIsLoadingCodes(true);
    try {
      const list = await getPromoCodes(restaurantId);
      // Only keep active promocodes
      const active = (list || []).filter((c) => c.status === "active");
      setAvailableCodes(active);
    } catch {
      setAvailableCodes([]);
    } finally {
      setIsLoadingCodes(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    void loadCodes();
  }, [loadCodes]);

  const apply = useCallback(async (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) {
      setError("Enter a promo code first.");
      return false;
    }
    setIsApplying(true);
    setError(null);
    try {
      const res = await applyPromoCode(trimmed);
      setResult(res);
      setAppliedCode(trimmed.toUpperCase());
      return true;
    } catch (err) {
      setResult(null);
      setAppliedCode(null);
      setError(
        err instanceof Error ? err.message : "Couldn't apply that code.",
      );
      return false;
    } finally {
      setIsApplying(false);
    }
  }, []);

  const remove = useCallback(() => {
    setAppliedCode(null);
    setResult(null);
    setError(null);
  }, []);

  return {
    appliedCode,
    result,
    isApplying,
    error,
    availableCodes,
    isLoadingCodes,
    apply,
    remove,
    refreshCodes: loadCodes,
  };
}
