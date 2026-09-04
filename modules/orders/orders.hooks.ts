"use client";

/**
 * Orders Hooks
 * Loads the signed-in customer's orders and splits them into the single
 * "ongoing" delivery (if any) and the rest for the Recent Orders list.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { getOrders, isActiveOrder } from "./orders.api";
import type { Order } from "./orders.types";
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
