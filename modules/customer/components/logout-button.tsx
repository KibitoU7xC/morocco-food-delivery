"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("auth_token");
      window.localStorage.removeItem("customer_data");
      window.localStorage.removeItem("cart_count");
      window.dispatchEvent(new Event("auth_updated"));
      window.dispatchEvent(new CustomEvent("cart_updated", { detail: { count: 0 } }));
    } catch {
      // storage unavailable — nothing to clear
    }
    router.push("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-surface-container bg-surface-container-lowest px-space-md py-3 font-label-md text-label-md text-error shadow-card transition-colors hover:bg-surface-container-low"
    >
      <Icon name="logout" size={20} />
      Log out of account
    </button>
  );
}
