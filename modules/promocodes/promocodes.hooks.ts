"use client";

/**
 * Promo Codes Hooks
 * Coupon box state for the Cart & Checkout page: apply validates the code via
 * POST /promocodes/apply for immediate feedback; the checkout orchestrator
 * then re-fetches the order summary with `promo_code` set so the bill total
 * reflects the discount.
 */

import { useCallback, useState } from "react";
import { applyPromoCode } from "./promocodes.api";
import type { ApplyPromoResponse } from "./promocodes.types";

interface UsePromoCodeResult {
  appliedCode: string | null;
  result: ApplyPromoResponse | null;
  isApplying: boolean;
  error: string | null;
  apply: (code: string) => Promise<boolean>;
  remove: () => void;
}

export function usePromoCode(): UsePromoCodeResult {
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [result, setResult] = useState<ApplyPromoResponse | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return { appliedCode, result, isApplying, error, apply, remove };
}
