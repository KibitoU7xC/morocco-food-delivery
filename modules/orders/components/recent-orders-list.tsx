import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { formatDateTime, formatMAD } from "@/lib/utils";
import { OrderStatusBadge } from "./order-status-badge";
import type { Order } from "../orders.types";
import type { PaginationMeta } from "@/types/common";

interface RecentOrdersListProps {
  orders: Order[];
  pagination: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function RecentOrdersList({
  orders,
  pagination,
  isLoading,
  error,
  onRetry,
}: RecentOrdersListProps) {
  return (
    <div className="flex flex-col gap-space-sm pt-space-xs">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-headline-sm text-on-surface">
          Recent Orders
        </h3>
        {pagination && pagination.total > 0 ? (
          <Link
            href="/orders"
            className="font-label-md text-label-md text-secondary hover:underline"
          >
            View all ({pagination.total})
          </Link>
        ) : null}
      </div>

      {error ? (
        <div className="flex flex-col items-center gap-space-sm rounded-3xl bg-surface-container-lowest p-space-xl text-center shadow-card">
          <Icon name="error" size={24} className="text-error" />
          <p className="font-body-sm text-body-sm text-on-surface-variant">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="rounded-xl bg-primary-container px-space-md py-1.5 font-label-md text-label-md text-on-primary-container hover:brightness-95"
          >
            Try again
          </button>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col gap-space-sm">
          {[0, 1].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-3xl bg-surface-container-lowest shadow-card" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center gap-space-xs rounded-3xl bg-surface-container-lowest p-space-2xl text-center shadow-card">
          <Icon name="shopping_bag" size={26} className="text-on-surface-variant" />
          <p className="font-headline-sm text-headline-sm text-on-surface">
            No orders yet
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Your order history will show up here once you place your first order.
          </p>
          <Link
            href="/"
            className="mt-1 font-label-sm text-label-sm text-secondary hover:underline"
          >
            Browse restaurants
          </Link>
        </div>
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      )}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const reorderHref = order.restaurant_id ? `/restaurants/${order.restaurant_id}` : null;
  const itemsSummary = order.payment_details?.items
    ?.map((item) => `${item.quantity}x ${item.product_name}`)
    .join(", ");

  return (
    <article className="flex flex-col gap-space-sm rounded-3xl bg-surface-container-lowest p-space-md shadow-card md:p-space-lg">
      <div className="flex flex-col justify-between gap-space-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-space-md">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-surface-container-high shadow-card text-on-surface-variant">
            <Icon name="shopping_bag" size={22} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h4 className="font-headline-sm text-on-surface">
                {order.restaurant?.name ?? `Order #${order.order_number}`}
              </h4>
              <OrderStatusBadge status={order.status} />
            </div>
            {itemsSummary ? (
              <span className="line-clamp-1 max-w-md font-body-sm text-on-surface-variant">
                {itemsSummary}
              </span>
            ) : order.delivery_address ? (
              <span className="font-body-sm text-on-surface-variant">
                {order.delivery_address}
              </span>
            ) : null}
            <span className="text-[12px] font-body-sm text-on-surface-variant">
              {order.status === "delivered" ? "Delivered" : "Placed"}{" "}
              {formatDateTime(order.updated_at ?? order.created_at)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end sm:justify-center">
          <span className="font-headline-md text-on-surface">
            {formatMAD(order.total_amount)}
          </span>
          {reorderHref ? (
            <Link
              href={reorderHref}
              className="flex items-center gap-1 rounded-xl bg-primary-container px-space-md py-1.5 font-label-md text-label-md text-on-primary-container shadow-card transition-all hover:brightness-95"
            >
              <Icon name="replay" size={16} />
              Reorder
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
