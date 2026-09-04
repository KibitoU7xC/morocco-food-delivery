import { Icon } from "@/components/ui/icon";
import { formatMAD } from "@/lib/utils";
import { OrderStatusBadge } from "./order-status-badge";
import type { Order } from "../orders.types";

interface OngoingDeliveryCardProps {
  order: Order | null;
  isLoading: boolean;
}

/**
 * Order records from GET /api/v1/orders include a slim `restaurant` and
 * `payment_details.items` (verified live 2026-09-04 by placing a real order)
 * — no photo, so the icon tile stays a placeholder.
 */
export function OngoingDeliveryCard({ order, isLoading }: OngoingDeliveryCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-3xl bg-surface-container-lowest p-space-lg shadow-card">
        <div className="h-24 animate-pulse rounded-2xl bg-surface-container-low" />
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-surface-container-lowest p-space-lg shadow-card">
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            {order ? (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-container opacity-75" />
            ) : null}
            <span
              className={
                "relative inline-flex h-3 w-3 rounded-full " +
                (order ? "bg-primary-container" : "bg-surface-container-highest")
              }
            />
          </span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">
            Ongoing Delivery
          </h3>
        </div>
        {order ? (
          <span className="font-body-sm text-on-surface-variant">
            #{order.order_number}
          </span>
        ) : null}
      </div>

      {order ? (
        <div className="flex flex-col gap-space-md rounded-2xl bg-surface-container-low p-space-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-space-md">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-surface-container-lowest shadow-card text-secondary">
              <Icon name="package_2" size={22} />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-on-surface">
                  {order.restaurant?.name ?? `Order #${order.order_number}`}
                </span>
                <OrderStatusBadge status={order.status} />
              </div>
              {order.payment_details?.items?.length ? (
                <span className="line-clamp-1 max-w-xs font-body-sm text-on-surface-variant">
                  {order.payment_details.items
                    .map((item) => `${item.quantity}x ${item.product_name}`)
                    .join(", ")}
                </span>
              ) : order.delivery_address ? (
                <span className="font-body-sm text-on-surface-variant">
                  {order.delivery_address}
                </span>
              ) : null}
              <span className="mt-0.5 font-label-md text-secondary">
                {formatMAD(order.total_amount)}
              </span>
            </div>
          </div>
          <a
            href={`/orders/${order.id}`}
            className="flex flex-shrink-0 items-center justify-center gap-1.5 rounded-xl bg-secondary px-space-md py-2 font-label-md text-label-md text-on-secondary shadow-card transition-all hover:brightness-110"
          >
            <Icon name="near_me" size={18} />
            Track Live
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-space-xs rounded-2xl bg-surface-container-low p-space-lg text-center">
          <Icon name="package_2" size={24} className="text-on-surface-variant" />
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            No deliveries in progress right now.
          </p>
        </div>
      )}
    </div>
  );
}
