import { cn } from "@/lib/utils";
import type { OrderStatus } from "../orders.types";

const STATUS_META: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-surface-container-high text-on-surface-variant" },
  confirmed: { label: "Confirmed", className: "bg-secondary-fixed text-on-secondary-fixed" },
  preparing: { label: "Preparing", className: "bg-primary-fixed text-on-primary-fixed-variant" },
  on_the_way: { label: "On the Way", className: "bg-secondary-fixed text-on-secondary-fixed" },
  delivered: { label: "Delivered", className: "bg-tertiary-fixed/40 text-on-tertiary-fixed-variant" },
  cancelled: { label: "Cancelled", className: "bg-error-container text-on-error-container" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const meta = STATUS_META[status] ?? {
    label: status,
    className: "bg-surface-container-high text-on-surface-variant",
  };
  return (
    <span
      className={cn(
        "rounded-md px-2 py-0.5 font-label-sm text-[10px] font-bold uppercase",
        meta.className,
      )}
    >
      {meta.label}
    </span>
  );
}
