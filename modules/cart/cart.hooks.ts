"use client";

/**
 * Cart Hooks
 * Loads the signed-in customer's active cart and exposes quantity/remove
 * mutations for the Cart & Checkout page.
 */

import { useCallback, useEffect, useState } from "react";
import { getCart, isCartEmpty, removeCartItem, updateCartItem } from "./cart.api";
import type { Cart } from "./cart.types";

interface UseCartResult {
  cart: Cart | null;
  isEmpty: boolean;
  isLoading: boolean;
  error: string | null;
  /** Cart item id currently being updated/removed (disables its row's controls). */
  mutatingItemId: number | null;
  refresh: () => void;
  setQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
}

function syncCartCount(c: Cart | null) {
  if (typeof window === 'undefined') return;
  const count = !c || !Array.isArray(c.items)
    ? 0
    : c.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  try {
    window.localStorage.setItem('cart_count', String(count));
    window.dispatchEvent(new CustomEvent('cart_updated', { detail: { count } }));
  } catch {
    // non-fatal
  }
}

/** @param enabled Only fetch once the caller knows the customer is signed in. */
export function useCart(enabled: boolean): UseCartResult {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [mutatingItemId, setMutatingItemId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCart();
      setCart(data);
      syncCartCount(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't load your cart.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) void load();
  }, [enabled, load]);

  const setQuantity = useCallback(async (itemId: number, quantity: number) => {
    setMutatingItemId(itemId);
    setError(null);
    try {
      const updated = await updateCartItem(itemId, quantity);
      setCart(updated);
      syncCartCount(updated);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Couldn't update that item.",
      );
    } finally {
      setMutatingItemId(null);
    }
  }, []);

  const removeItem = useCallback(async (itemId: number) => {
    setMutatingItemId(itemId);
    setError(null);
    try {
      const updated = await removeCartItem(itemId);
      setCart(updated);
      syncCartCount(updated);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Couldn't remove that item.",
      );
    } finally {
      setMutatingItemId(null);
    }
  }, []);

  return {
    cart,
    isEmpty: isCartEmpty(cart),
    isLoading,
    error,
    mutatingItemId,
    refresh: load,
    setQuantity,
    removeItem,
  };
}
