"use client";

/**
 * Orders Hooks
 * Loads the signed-in customer's orders and splits them into the single
 * "ongoing" delivery (if any) and the rest for the Recent Orders list.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { getOrders, getOrderSummary, isActiveOrder, placeOrder } from "./orders.api";
import type { Order, OrderSummary, PlaceOrderRequest } from "./orders.types";
import type { PaginationMeta } from "@/types/common";

interface UseOrdersResult {
  orders: Order[];
  ongoingOrder: Order | null;
  recentOrders: Order[];
  pagination: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

/** @param enabled Only fetch once the caller knows the customer is signed in. */
export function useOrders(limit = 10, enabled = true): UseOrdersResult {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getOrders({ page: 1, limit });
      setOrders(res.data ?? []);
      setPagination(res.pagination ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't load your orders.");
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    if (enabled) void load();
  }, [enabled, load]);

  const ongoingOrder = useMemo(
    () => orders.find(isActiveOrder) ?? null,
    [orders],
  );
  const recentOrders = useMemo(
    () => orders.filter((order) => order.id !== ongoingOrder?.id),
    [orders, ongoingOrder],
  );

  return { orders, ongoingOrder, recentOrders, pagination, isLoading, error, retry: load };
}

interface UseOrderSummaryArgs {
  customerAddressId: number | null;
  promoCode: string | null;
  /** Skip fetching (e.g. cart is empty, or not signed in). */
  enabled: boolean;
}

interface UseOrderSummaryResult {
  summary: OrderSummary | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Quotes the active cart against the selected address (+ promo). Re-fetches
 * whenever the address or promo changes; the caller should also invoke
 * `refresh()` after any cart mutation (add/remove/quantity), since the
 * summary is computed server-side from the cart and there's no other signal
 * to react to.
 */
export function useOrderSummary({
  customerAddressId,
  promoCode,
  enabled,
}: UseOrderSummaryArgs): UseOrderSummaryResult {
  const [summary, setSummary] = useState<OrderSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!enabled || !customerAddressId) {
      setSummary(null);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      setSummary(
        await getOrderSummary({
          customer_address_id: customerAddressId,
          promo_code: promoCode ?? undefined,
        }),
      );
    } catch (err) {
      setSummary(null);
      setError(
        err instanceof Error ? err.message : "Couldn't calculate your bill.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [enabled, customerAddressId, promoCode]);

  useEffect(() => {
    void load();
  }, [load]);

  return { summary, isLoading, error, refresh: load };
}

interface UsePlaceOrderResult {
  isPlacing: boolean;
  error: string | null;
  placedOrder: Order | null;
  submit: (payload: PlaceOrderRequest) => Promise<Order | null>;
}

export function usePlaceOrder(): UsePlaceOrderResult {
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const submit = useCallback(async (payload: PlaceOrderRequest) => {
    setIsPlacing(true);
    setError(null);
    try {
      const order = await placeOrder(payload);
      setPlacedOrder(order);
      return order;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Couldn't place your order.",
      );
      return null;
    } finally {
      setIsPlacing(false);
    }
  }, []);

  return { isPlacing, error, placedOrder, submit };
}
