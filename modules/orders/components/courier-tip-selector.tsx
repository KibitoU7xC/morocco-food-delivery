"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const PRESETS = [5, 10, 20];

interface CourierTipSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

/**
 * POST /orders/place-order has no tip field — this is presentational only for
 * now, kept out of the Bill Details total so the displayed total always
 * matches what's actually charged.
 */
export function CourierTipSelector({ value, onChange }: CourierTipSelectorProps) {
  const [customOpen, setCustomOpen] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const isPreset = PRESETS.includes(value);

  return (
    <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-card">
      <div className="mb-space-xs flex items-center justify-between">
        <span className="flex items-center gap-space-xs font-label-md text-label-md font-bold text-on-surface">
          <Icon name="two_wheeler" size={20} className="text-primary" />
          Add Courier Tip
        </span>
        <span className="font-body-sm text-body-sm font-semibold text-tertiary">
          100% goes to driver
        </span>
      </div>

      <div className="mt-space-xs grid grid-cols-4 gap-space-xs">
        {PRESETS.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => {
              setCustomOpen(false);
              onChange(value === amount ? 0 : amount);
            }}
            className={cn(
              "rounded-xl py-space-xs font-label-md text-label-md font-bold transition-colors",
              value === amount
                ? "bg-primary-fixed text-on-primary-fixed shadow-card"
                : "bg-surface-container text-on-surface hover:bg-primary-fixed/60",
            )}
          >
            +{amount} MAD
          </button>
        ))}
        <button
          type="button"
          onClick={() => setCustomOpen((open) => !open)}
          className={cn(
            "rounded-xl py-space-xs font-label-md text-label-md font-bold transition-colors",
            customOpen || (!isPreset && value > 0)
              ? "bg-primary-fixed text-on-primary-fixed shadow-card"
              : "bg-surface-container text-on-surface hover:bg-primary-fixed/60",
          )}
        >
          Custom
        </button>
      </div>

      {customOpen ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const n = Number(customValue);
            if (Number.isFinite(n) && n >= 0) onChange(n);
          }}
          className="mt-space-sm flex items-center gap-space-xs"
        >
          <input
            type="number"
            min={0}
            step={1}
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="Custom amount (MAD)"
            className="h-10 w-full rounded-xl border border-surface-container-highest bg-surface-container-low px-space-sm font-body-sm text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
          />
          <button
            type="submit"
            className="rounded-xl bg-secondary px-space-md py-2 font-label-sm text-label-sm font-bold text-on-secondary hover:bg-secondary-container"
          >
            Set
          </button>
        </form>
      ) : null}

      <p className="mt-space-xs font-body-sm text-body-sm text-on-surface-variant">
        Not part of this order&apos;s total yet — tipping at checkout is coming soon.
      </p>
    </div>
  );
}
