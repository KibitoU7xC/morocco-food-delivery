"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn, formatMAD } from "@/lib/utils";
import type { ApplyPromoResponse, PromoCode } from "../promocodes.types";

interface PromoCodeBoxProps {
  appliedCode: string | null;
  result: ApplyPromoResponse | null;
  isApplying: boolean;
  error: string | null;
  availableCodes?: PromoCode[];
  isLoadingCodes?: boolean;
  onApply: (code: string) => void;
  onRemove: () => void;
}

export function PromoCodeBox({
  appliedCode,
  result,
  isApplying,
  error,
  availableCodes = [],
  isLoadingCodes = false,
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

      {/* Applicable Coupons Section (API-Driven) */}
      <div className="mt-space-md border-t border-surface-container pt-space-sm">
        <div className="mb-space-xs flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">
            <Icon name="local_offer" size={14} className="text-secondary" />
            Applicable Coupons
          </span>
          {availableCodes.length > 0 ? (
            <span className="rounded-full bg-secondary-container/40 px-2 py-0.5 font-label-sm text-[11px] font-bold text-secondary">
              {availableCodes.length} Available
            </span>
          ) : null}
        </div>

        {isLoadingCodes ? (
          <div className="space-y-2 pt-1">
            <div className="h-14 animate-pulse rounded-xl bg-surface-container-low" />
          </div>
        ) : availableCodes.length > 0 ? (
          <div className="flex flex-col gap-2 pt-1">
            {availableCodes.map((coupon) => {
              const isCurrent =
                appliedCode?.toUpperCase() === coupon.code.toUpperCase();
              return (
                <div
                  key={coupon.id}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-xl border p-2.5 transition-all",
                    isCurrent
                      ? "border-tertiary bg-tertiary-fixed/15 shadow-sm"
                      : "border-dashed border-outline-variant/60 bg-surface-container-low/40 hover:border-secondary hover:bg-surface-container-low"
                  )}
                >
                  <div className="flex flex-col min-w-0 pr-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="rounded-md bg-surface-container-high px-2 py-0.5 font-label-sm text-xs font-black uppercase tracking-wider text-on-surface border border-outline-variant/40">
                        {coupon.code}
                      </span>
                      <span className="font-label-sm text-xs font-extrabold text-tertiary">
                        {coupon.discount_type === "percentage"
                          ? `${coupon.discount_value}% OFF`
                          : `${Number(coupon.discount_value).toFixed(0)} MAD OFF`}
                      </span>
                    </div>
                    <span className="mt-1 font-body-sm text-[11px] text-on-surface-variant truncate">
                      {coupon.description ||
                        (coupon.min_order_amount > 0
                          ? `On orders above ${formatMAD(coupon.min_order_amount)}`
                          : "Valid on this order")}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (isCurrent) {
                        onRemove();
                      } else {
                        onApply(coupon.code);
                      }
                    }}
                    disabled={isApplying}
                    className={cn(
                      "flex-shrink-0 rounded-lg px-3 py-1 font-label-sm text-xs font-bold transition-all cursor-pointer shadow-sm",
                      isCurrent
                        ? "bg-tertiary text-on-tertiary hover:opacity-90"
                        : "bg-secondary text-on-secondary hover:brightness-95 disabled:opacity-50"
                    )}
                  >
                    {isCurrent ? (
                      <span className="flex items-center gap-1">
                        <Icon name="check" size={14} />
                        Applied
                      </span>
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="pt-1 font-body-sm text-xs text-on-surface-variant">
            No applicable coupons available right now.
          </p>
        )}
      </div>
    </div>
  );
}

