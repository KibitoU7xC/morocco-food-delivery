"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { formatMAD } from "@/lib/utils";
import type { ApplyPromoResponse } from "../promocodes.types";

interface PromoCodeBoxProps {
  appliedCode: string | null;
  result: ApplyPromoResponse | null;
  isApplying: boolean;
  error: string | null;
  onApply: (code: string) => void;
  onRemove: () => void;
}

export function PromoCodeBox({
  appliedCode,
  result,
  isApplying,
  error,
  onApply,
  onRemove,
}: PromoCodeBoxProps) {
  const [draft, setDraft] = useState("");

  return (
    <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-card">
      <div className="mb-space-sm flex items-center justify-between">
        <span className="flex items-center gap-1 font-label-md text-label-md font-bold text-on-surface">
          <Icon name="local_offer" size={20} className="text-primary" />
          Coupons &amp; Vouchers
        </span>
      </div>

      {appliedCode ? (
        <div className="mb-space-xs flex items-center gap-space-xs rounded-xl bg-surface-container p-0.5">
          <span className="w-full truncate px-space-xs font-label-md text-label-md font-extrabold uppercase tracking-wider text-on-surface">
            {appliedCode}
          </span>
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 rounded-lg bg-surface-container-high px-space-md py-space-xs font-label-sm text-label-sm font-bold text-on-surface transition-colors hover:bg-surface-container-highest"
          >
            <Icon name="close" size={14} />
            Remove
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onApply(draft);
          }}
          className="mb-space-xs flex items-center gap-space-xs rounded-xl bg-surface-container p-0.5"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Enter promo code"
            className="w-full bg-transparent px-space-xs font-label-md text-label-md font-extrabold uppercase tracking-wider text-on-surface outline-none placeholder:font-normal placeholder:normal-case placeholder:text-on-surface-variant/70"
          />
          <button
            type="submit"
            disabled={isApplying || !draft.trim()}
            className="rounded-lg bg-secondary px-space-md py-space-xs font-label-sm text-label-sm font-bold text-on-secondary transition-colors hover:bg-secondary-container disabled:opacity-60"
          >
            {isApplying ? "Applying…" : "Apply"}
          </button>
        </form>
      )}

      {result && appliedCode ? (
        <div className="flex items-center gap-1 rounded-lg bg-tertiary-fixed/30 px-space-xs py-0.5 font-label-sm text-label-sm text-tertiary">
          <Icon name="check" size={16} />
          <span>
            Coupon savings: <strong>{formatMAD(result.discount_amount)}</strong> applied
            successfully!
          </span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-1 rounded-lg bg-error-container px-space-xs py-0.5 font-label-sm text-label-sm text-on-error-container">
          <Icon name="error" size={16} />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
}
