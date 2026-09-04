"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import type {
  AddressType,
  CreateAddressRequest,
  CustomerAddress,
} from "../addresses.types";

const TYPE_LABEL: Record<AddressType, string> = {
  home: "Home",
  apartment: "Apartment",
  other: "Other",
};

interface SavedAddressesProps {
  addresses: CustomerAddress[];
  isLoading: boolean;
  error: string | null;
  mutatingId: number | "new" | null;
  add: (payload: CreateAddressRequest) => Promise<boolean>;
  edit: (id: number, payload: CreateAddressRequest) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
}

export function SavedAddresses({
  addresses,
  isLoading,
  error,
  mutatingId,
  add,
  edit,
  remove,
}: SavedAddressesProps) {
  const [formMode, setFormMode] = useState<"closed" | "add" | number>("closed");

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this address?")) return;
    await remove(id);
  };

  return (
    <div className="flex flex-col gap-space-md rounded-3xl bg-surface-container-lowest p-space-lg shadow-card">
      <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
        <h3 className="flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface">
          <Icon name="home_pin" size={20} className="text-primary" />
          Saved Addresses
        </h3>
        {formMode === "closed" ? (
          <button
            type="button"
            onClick={() => setFormMode("add")}
            className="font-label-sm text-label-sm text-secondary hover:underline"
          >
            + Add New
          </button>
        ) : null}
      </div>

      {error ? <p className="font-body-sm text-body-sm text-error">{error}</p> : null}

      {isLoading ? (
        <div className="flex flex-col gap-space-sm">
          {[0, 1].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-surface-container-low" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-space-sm">
          {addresses.map((address) =>
            formMode === address.id ? (
              <AddressForm
                key={address.id}
                initial={address}
                isSaving={mutatingId === address.id}
                onCancel={() => setFormMode("closed")}
                onSubmit={async (payload) => {
                  const ok = await edit(address.id, payload);
                  if (ok) setFormMode("closed");
                }}
              />
            ) : (
              <div
                key={address.id}
                className="flex items-start justify-between gap-space-sm rounded-2xl bg-surface-container-low p-space-sm"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-on-surface">
                      {TYPE_LABEL[address.type] ?? address.type}
                    </span>
                    {address.is_default ? (
                      <span className="rounded-full bg-tertiary-fixed px-2 py-0.5 font-label-sm text-[10px] font-bold uppercase text-on-tertiary-fixed">
                        Default
                      </span>
                    ) : null}
                  </div>
                  <p className="font-body-sm text-on-surface-variant">
                    {[address.address_line_1, address.address_line_2, address.city]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1">
                  <button
                    type="button"
                    title="Edit"
                    onClick={() => setFormMode(address.id)}
                    disabled={mutatingId === address.id}
                    className="rounded-lg p-1 text-on-surface-variant hover:text-secondary disabled:opacity-50"
                  >
                    <Icon name="edit" size={18} />
                  </button>
                  <button
                    type="button"
                    title="Delete"
                    onClick={() => handleDelete(address.id)}
                    disabled={mutatingId === address.id}
                    className="rounded-lg p-1 text-on-surface-variant hover:text-error disabled:opacity-50"
                  >
                    <Icon name="delete" size={18} />
                  </button>
                </div>
              </div>
            ),
          )}

          {formMode === "add" ? (
            <AddressForm
              isSaving={mutatingId === "new"}
              onCancel={() => setFormMode("closed")}
              onSubmit={async (payload) => {
                const ok = await add(payload);
                if (ok) setFormMode("closed");
              }}
            />
          ) : null}

          {!isLoading && addresses.length === 0 && formMode === "closed" ? (
            <div className="flex flex-col items-center gap-space-xs rounded-2xl bg-surface-container-low p-space-lg text-center">
              <Icon name="home_pin" size={24} className="text-on-surface-variant" />
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                No saved addresses yet.
              </p>
              <button
                type="button"
                onClick={() => setFormMode("add")}
                className="mt-1 font-label-sm text-label-sm text-secondary hover:underline"
              >
                + Add your first address
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

interface AddressFormProps {
  initial?: CustomerAddress;
  isSaving: boolean;
  onCancel: () => void;
  onSubmit: (payload: CreateAddressRequest) => Promise<void>;
}

function AddressForm({ initial, isSaving, onCancel, onSubmit }: AddressFormProps) {
  const [type, setType] = useState<AddressType>(initial?.type ?? "home");
  const [addressLine1, setAddressLine1] = useState(initial?.address_line_1 ?? "");
  const [addressLine2, setAddressLine2] = useState(initial?.address_line_2 ?? "");
  const [landmark, setLandmark] = useState(initial?.landmark ?? "");
  const [city, setCity] = useState(initial?.city ?? "");
  const [stateName, setStateName] = useState(initial?.state ?? "");
  const [pincode, setPincode] = useState(initial?.pincode ?? "");
  const [latitude, setLatitude] = useState(initial?.latitude?.toString() ?? "");
  const [longitude, setLongitude] = useState(initial?.longitude?.toString() ?? "");
  const [isDefault, setIsDefault] = useState(initial?.is_default ?? false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      type,
      address_line_1: addressLine1.trim(),
      address_line_2: addressLine2.trim() || undefined,
      landmark: landmark.trim() || undefined,
      city: city.trim(),
      state: stateName.trim(),
      pincode: pincode.trim(),
      latitude: Number(latitude),
      longitude: Number(longitude),
      is_default: isDefault,
    });
  };

  const inputClass =
    "h-10 w-full rounded-xl border border-surface-container-highest bg-surface-container-lowest px-space-sm font-body-sm text-on-surface focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-space-sm rounded-2xl bg-surface-container-low p-space-sm"
    >
      <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-3">
        {(Object.keys(TYPE_LABEL) as AddressType[]).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setType(value)}
            className={
              "rounded-lg px-space-sm py-2 font-label-sm text-label-sm transition-colors " +
              (type === value
                ? "bg-secondary text-on-secondary"
                : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface")
            }
          >
            {TYPE_LABEL[value]}
          </button>
        ))}
      </div>

      <input
        value={addressLine1}
        onChange={(e) => setAddressLine1(e.target.value)}
        placeholder="Address line (street, building, apt)"
        required
        className={inputClass}
      />
      <input
        value={addressLine2}
        onChange={(e) => setAddressLine2(e.target.value)}
        placeholder="Address line 2 (optional)"
        className={inputClass}
      />
      <input
        value={landmark}
        onChange={(e) => setLandmark(e.target.value)}
        placeholder="Landmark (optional)"
        className={inputClass}
      />
      <div className="grid grid-cols-2 gap-space-sm">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
          className={inputClass}
        />
        <input
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          placeholder="State / Region"
          required
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-3 gap-space-sm">
        <input
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Postal code"
          required
          className={inputClass}
        />
        <input
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
          type="number"
          step="any"
          required
          className={inputClass}
        />
        <input
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
          type="number"
          step="any"
          required
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="h-4 w-4 rounded border-surface-container-highest accent-secondary"
        />
        Set as default address
      </label>

      <div className="flex items-center gap-space-sm pt-1">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-1.5 rounded-xl bg-primary-container px-space-md py-2 font-label-md text-label-md text-on-primary-container transition-all hover:brightness-95 disabled:opacity-60"
        >
          {isSaving ? "Saving…" : "Save address"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="rounded-xl px-space-md py-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-lowest"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
