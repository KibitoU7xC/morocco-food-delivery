"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { AddressForm, ADDRESS_TYPE_LABEL } from "./saved-addresses";
import type { CreateAddressRequest, CustomerAddress } from "../addresses.types";

const TYPE_ICON: Record<string, IconName> = {
  home: "home",
  apartment: "apartment",
  other: "location_on",
};

interface AddressSelectorProps {
  addresses: CustomerAddress[];
  isLoading: boolean;
  error: string | null;
  mutatingId: number | "new" | null;
  selectedId: number | null;
  onSelect: (id: number) => void;
  add: (payload: CreateAddressRequest) => Promise<boolean>;
  note: string;
  onNoteChange: (note: string) => void;
}

/**
 * Delivery-address section of the checkout page: pick a saved address (or add
 * one) and an optional delivery note. Unlike the full CRUD card on the
 * profile page, this is select-only — editing/deleting addresses stays there.
 */
export function AddressSelector({
  addresses,
  isLoading,
  error,
  mutatingId,
  selectedId,
  onSelect,
  add,
  note,
  onNoteChange,
}: AddressSelectorProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <section className="rounded-2xl bg-surface-container-lowest p-space-xl shadow-card">
      <div className="mb-space-lg flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-fixed text-primary">
            <Icon name="location_on" size={20} />
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">
              Delivery Address
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Select your drop-off spot
            </p>
          </div>
        </div>
        {!showAddForm ? (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1 rounded-xl bg-surface-container px-space-sm py-space-xs font-label-md text-label-md text-on-surface transition-all hover:bg-surface-container-high"
          >
            <Icon name="add" size={18} />
            Add New Address
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="mb-space-md font-body-sm text-body-sm text-error">{error}</p>
      ) : null}

      {isLoading ? (
        <div className="mb-space-lg grid grid-cols-1 gap-space-md md:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-surface-container-low" />
          ))}
        </div>
      ) : (
        <div className="mb-space-lg grid grid-cols-1 gap-space-md md:grid-cols-2">
          {addresses.map((address) => {
            const selected = address.id === selectedId;
            return (
              <button
                key={address.id}
                type="button"
                onClick={() => onSelect(address.id)}
                className={cn(
                  "relative flex flex-col rounded-2xl p-space-md text-left shadow-card transition-all",
                  selected
                    ? "bg-surface-container-low"
                    : "bg-surface-container-lowest hover:bg-surface-container-low",
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="flex items-center gap-space-xs">
                    <Icon
                      name={TYPE_ICON[address.type] ?? "location_on"}
                      size={22}
                      className={selected ? "text-secondary" : "text-on-surface-variant"}
                    />
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">
                      {ADDRESS_TYPE_LABEL[address.type] ?? address.type}
                      {address.is_default ? " (Default)" : ""}
                    </span>
                  </span>
                  {selected ? (
                    <Icon name="check_circle" size={22} className="text-secondary" />
                  ) : (
                    <span className="h-5 w-5 rounded-full bg-surface-container-high" />
                  )}
                </div>
                <p className="mt-space-xs font-body-md text-body-md font-medium leading-snug text-on-surface">
                  {address.address_line_1}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {[address.address_line_2, address.city, address.pincode]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </button>
            );
          })}

          {!isLoading && addresses.length === 0 && !showAddForm ? (
            <div className="col-span-full flex flex-col items-center gap-space-xs rounded-2xl bg-surface-container-low p-space-lg text-center">
              <Icon name="location_on" size={24} className="text-on-surface-variant" />
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                You don&apos;t have a saved address yet.
              </p>
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="font-label-sm text-label-sm text-secondary hover:underline"
              >
                + Add a delivery address
              </button>
            </div>
          ) : null}
        </div>
      )}

      {showAddForm ? (
        <div className="mb-space-lg">
          <AddressForm
            isSaving={mutatingId === "new"}
            onCancel={() => setShowAddForm(false)}
            onSubmit={async (payload) => {
              const ok = await add(payload);
              if (ok) setShowAddForm(false);
            }}
          />
        </div>
      ) : null}

      <div className="relative flex items-center gap-space-sm rounded-xl bg-surface-container p-space-sm">
        <Icon name="edit_note" size={20} className="text-on-surface-variant" />
        <input
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Add delivery note (e.g., ring doorbell, call upon arrival)..."
          className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70 outline-none"
        />
        <span className="whitespace-nowrap font-label-sm text-label-sm text-outline-variant">
          Optional
        </span>
      </div>
    </section>
  );
}
