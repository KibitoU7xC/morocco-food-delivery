"use client";

/**
 * Customer Profile Hooks
 * Loads the signed-in customer's profile (token from localStorage — the API
 * requires a Bearer token and there's no server-side session) and exposes an
 * update action for the Personal Information card.
 */

import { useCallback, useEffect, useState } from "react";
import { getCustomerProfile, updateCustomerProfile } from "./customer.api";
import type { CustomerProfile, UpdateProfileRequest } from "./customer.types";

/**
 * `lib/api/client.ts` throws a plain Error with whatever `message` the API
 * sent, no status code attached. Laravel's `auth:sanctum` middleware replies
 * with exactly "Unauthenticated." for an invalid/expired/missing token on
 * every endpoint we've checked — detect that (and the generic 401 fallback
 * message) to tell "your session died" apart from a real fetch failure.
 */
function isAuthError(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("unauthenticated") ||
    normalized.includes("unauthorized") ||
    normalized.includes("401")
  );
}

interface UseCustomerProfileResult {
  profile: CustomerProfile | null;
  isLoading: boolean;
  error: string | null;
  /** null while the localStorage check hasn't run yet (avoids an SSR/CSR flash). */
  isAuthenticated: boolean | null;
  isSaving: boolean;
  update: (payload: UpdateProfileRequest) => Promise<boolean>;
  retry: () => void;
}

export function useCustomerProfile(): UseCustomerProfileResult {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const load = useCallback(async () => {
    let token: string | null = null;
    let cachedCustomer: CustomerProfile | null = null;
    try {
      token = window.localStorage.getItem("auth_token");
      const cachedStr = window.localStorage.getItem("customer_data");
      if (cachedStr) cachedCustomer = JSON.parse(cachedStr);
    } catch {
      token = null;
    }

    if (!token && !cachedCustomer) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    // Mark as authenticated immediately and populate cached profile to avoid flickering
    setIsAuthenticated(true);
    if (cachedCustomer) {
      setProfile(cachedCustomer);
    }
    setIsLoading(true);
    setError(null);

    try {
      const data = await getCustomerProfile();
      if (data) {
        setProfile(data);
        try {
          window.localStorage.setItem("customer_data", JSON.stringify(data));
        } catch {
          // non-fatal
        }
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Couldn't load your profile.";

      // Only drop session if we don't even have cached profile data
      if (isAuthError(message) && !cachedCustomer) {
        try {
          window.localStorage.removeItem("auth_token");
          window.localStorage.removeItem("customer_data");
          window.dispatchEvent(new Event("auth_updated"));
        } catch {
          // ignore
        }
        setIsAuthenticated(false);
        setProfile(null);
      } else if (!cachedCustomer) {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    if (typeof window !== "undefined") {
      window.addEventListener("auth_updated", load);
      window.addEventListener("storage", load);
      return () => {
        window.removeEventListener("auth_updated", load);
        window.removeEventListener("storage", load);
      };
    }
  }, [load]);

  const update = useCallback(async (payload: UpdateProfileRequest) => {
    setIsSaving(true);
    setError(null);
    try {
      const updated = await updateCustomerProfile(payload);
      setProfile(updated);
      try {
        window.localStorage.setItem("customer_data", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Couldn't save your profile.",
      );
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { profile, isLoading, error, isAuthenticated, isSaving, update, retry: load };
}
