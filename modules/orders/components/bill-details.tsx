import { Icon } from "@/components/ui/icon";
import { formatMAD } from "@/lib/utils";
import type { OrderSummary } from "../orders.types";

interface BillDetailsProps {
  summary: OrderSummary | null;
  isLoading: boolean;
  error: string | null;
  /** Explains why there's no summary yet, when applicable. */
  hint: string | null;
  onRetry?: () => void;
}

/**
 * Built entirely from GET /orders/summary's real fields — Item Total, Delivery
 * Fee, Tax, Discount (if a promo is applied), Total Payable. No "service fee" /
 * "packaging fee" / "eco-contribution" rows: the live API doesn't return them,
 * even though some reference designs show them.
 */
export function BillDetails({ summary, isLoading, error, hint, onRetry }: BillDetailsProps) {
  return (
    <div className="flex flex-col rounded-2xl bg-surface-container-lowest p-space-lg shadow-card">
      <h3 className="mb-space-md font-headline-sm text-headline-sm font-extrabold text-on-surface">
        Bill Details
      </h3>

      {isLoading ? (
        <div className="flex flex-col gap-space-sm">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-4 animate-pulse rounded bg-surface-container-low" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-start gap-space-xs rounded-xl bg-error-container p-space-sm text-on-error-container">
          <span className="flex items-center gap-1 font-label-md text-label-md font-bold">
            <Icon name="info" size={18} />
            Couldn&apos;t calculate your bill
          </span>
          <span className="font-body-sm text-body-sm">{error}</span>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-on-error-container underline hover:no-underline cursor-pointer"
            >
              <Icon name="replay" size={14} />
              Retry calculation
            </button>
          ) : null}
        </div>
      ) : summary ? (
        <>
          <div className="flex flex-col gap-space-sm font-body-md text-body-md text-on-surface-variant">
            <Row label="Item Total" value={formatMAD(summary.subtotal)} />
            <Row
              label="Delivery Fee"
              value={summary.delivery_fee > 0 ? formatMAD(summary.delivery_fee) : "FREE"}
              valueClassName={summary.delivery_fee > 0 ? undefined : "text-tertiary font-extrabold"}
            />
            <Row label="Tax" value={formatMAD(summary.tax_amount)} />
            {summary.discount_amount > 0 ? (
              <Row
                label={`Coupon Discount${summary.applied_promo ? ` (${summary.applied_promo.code})` : ""}`}
                value={`−${formatMAD(summary.discount_amount)}`}
                labelClassName="text-tertiary"
                valueClassName="text-tertiary font-bold"
              />
            ) : null}
          </div>

          <div className="my-space-md flex items-center justify-between rounded-xl bg-surface-container-high p-space-md">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">
                Total Payable
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Includes delivery &amp; tax
              </span>
            </div>
            <div className="flex items-baseline gap-1 text-right">
              <span className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
                {Number(summary.total_amount).toFixed(2)}
              </span>
              <span className="font-label-md text-label-md font-bold text-on-surface">MAD</span>
            </div>
          </div>
        </>
      ) : (
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {hint ?? "Add items and a delivery address to see your bill."}
        </p>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  labelClassName,
  valueClassName,
}: {
  label: string;
  value: string;
  labelClassName?: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={labelClassName}>{label}</span>
      <span className={`font-label-md text-label-md font-semibold text-on-surface ${valueClassName ?? ""}`}>
        {value}
      </span>
    </div>
  );
}
