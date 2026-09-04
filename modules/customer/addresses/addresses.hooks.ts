"use client";

/**
 * Customer Addresses Hooks
 * Client-side list + create/update/delete for the Saved Addresses card.
 */

import { useCallback, useEffect, useState } from "react";
import {
  createAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "./addresses.api";
import type {
  CreateAddressRequest,
  CustomerAddress,
  UpdateAddressRequest,
} from "./addresses.types";

interface UseAddressesResult {
  addresses: CustomerAddress[];
  isLoading: boolean;
  error: string | null;
  /** Address id currently being saved/deleted (disables its row's actions). */
  mutatingId: number | "new" | null;
  refresh: () => void;
  add: (payload: CreateAddressRequest) => Promise<boolean>;
  edit: (id: number, payload: UpdateAddressRequest) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
}

/** @param enabled Only fetch once the caller knows the customer is signed in. */
export function useAddresses(enabled: boolean): UseAddressesResult {
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [mutatingId, setMutatingId] = useState<number | "new" | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setAddresses(await getAddresses());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Couldn't load your addresses.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) void load();
  }, [enabled, load]);

  const add = useCallback(
    async (payload: CreateAddressRequest) => {
      setMutatingId("new");
      try {
        const created = await createAddress(payload);
        setAddresses((prev) =>
          payload.is_default
            ? [...prev.map((a) => ({ ...a, is_default: false })), created]
            : [...prev, created],
        );
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Couldn't save that address.",
        );
        return false;
      } finally {
        setMutatingId(null);
      }
    },
    [],
  );

  const edit = useCallback(
    async (id: number, payload: UpdateAddressRequest) => {
      setMutatingId(id);
      try {
        const updated = await updateAddress(id, payload);
        setAddresses((prev) =>
          prev.map((a) =>
            a.id === id
              ? updated
              : payload.is_default
                ? { ...a, is_default: false }
                : a,
          ),
        );
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Couldn't update that address.",
        );
        return false;
      } finally {
        setMutatingId(null);
      }
    },
    [],
  );

  const remove = useCallback(async (id: number) => {
    setMutatingId(id);
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Couldn't delete that address.",
      );
      return false;
    } finally {
      setMutatingId(null);
    }
  }, []);

  return { addresses, isLoading, error, mutatingId, refresh: load, add, edit, remove };
}
