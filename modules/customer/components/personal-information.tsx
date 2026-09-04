"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { CustomerProfile, UpdateProfileRequest } from "../customer.types";

interface PersonalInformationProps {
  profile: CustomerProfile;
  isEditing: boolean;
  onEditToggle: (editing: boolean) => void;
  onSave: (payload: UpdateProfileRequest) => Promise<boolean>;
  isSaving: boolean;
  error: string | null;
}

/**
 * Editable fields are exactly what PUT /api/v1/customer/profile accepts:
 * name + mobile. Email and password are shown read-only — the API has no
 * endpoint to change either.
 */
export function PersonalInformation({
  profile,
  isEditing,
  onEditToggle,
  onSave,
  isSaving,
  error,
}: PersonalInformationProps) {
  const [name, setName] = useState(profile.name);
  const [mobile, setMobile] = useState(profile.mobile);

  useEffect(() => {
    if (!isEditing) {
      setName(profile.name);
      setMobile(profile.mobile);
    }
  }, [isEditing, profile.name, profile.mobile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await onSave({ name: name.trim(), mobile: mobile.trim() });
    if (ok) onEditToggle(false);
  };

  return (
    <div className="flex flex-col gap-space-md rounded-3xl bg-surface-container-lowest p-space-lg shadow-card">
      <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
        <h3 className="flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface">
          <Icon name="badge" size={20} className="text-secondary" />
          Personal Information
        </h3>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => onEditToggle(true)}
            className="font-label-sm text-label-sm text-secondary hover:underline"
          >
            Edit
          </button>
        ) : null}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
          <Field label="Full Name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 w-full rounded-xl border border-surface-container-highest bg-surface-container-low px-space-sm font-body-sm text-on-surface focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </Field>
          <Field label="Phone">
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="h-11 w-full rounded-xl border border-surface-container-highest bg-surface-container-low px-space-sm font-body-sm text-on-surface focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </Field>
          <Row label="Email">
            <span className="font-label-md text-on-surface-variant">
              {profile.email} <span className="text-[11px]">(not editable)</span>
            </span>
          </Row>

          {error ? (
            <p className="font-body-sm text-body-sm text-error">{error}</p>
          ) : null}

          <div className="mt-space-xs flex items-center gap-space-sm">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-xl bg-primary-container px-space-md py-2 font-label-md text-label-md text-on-primary-container transition-all hover:brightness-95 disabled:opacity-60"
            >
              {isSaving ? "Saving…" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={() => onEditToggle(false)}
              disabled={isSaving}
              className="rounded-xl px-space-md py-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-low"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-space-sm text-body-sm">
          <Row label="Full Name">{profile.name}</Row>
          <Row label="Phone">
            {profile.country_code} {profile.mobile}
          </Row>
          <Row label="Email">{profile.email}</Row>
          <Row label="Password">••••••••••••</Row>
        </div>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-on-surface-variant">{label}</span>
      <span className="font-label-md text-on-surface">{children}</span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-label-sm text-label-sm text-on-surface-variant">
        {label}
      </span>
      {children}
    </label>
  );
}
