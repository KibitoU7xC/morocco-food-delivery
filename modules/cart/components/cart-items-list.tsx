import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { formatMAD, initialsOf, resolveAssetUrl } from "@/lib/utils";
import type { Cart, CartItem } from "../cart.types";

interface CartItemsListProps {
  cart: Cart;
  mutatingItemId: number | null;
  onSetQuantity: (itemId: number, quantity: number) => void;
  onRemove: (itemId: number) => void;
}

/**
 * Order items from the cart's (single) restaurant, with quantity controls.
 * The cart API's nested `product` never includes an image (verified live),
 * so rows fall back to an initials tile.
 */
export function CartItemsList({
  cart,
  mutatingItemId,
  onSetQuantity,
  onRemove,
}: CartItemsListProps) {
  const restaurant = cart.restaurant;

  return (
    <section className="rounded-2xl bg-surface-container-lowest p-space-xl shadow-card">
      {restaurant ? (
        <div className="mb-space-lg flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface-container-high shadow-card text-on-surface-variant">
              {restaurant.logo ? (
                <Image
                  src={resolveAssetUrl(restaurant.logo) ?? ""}
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Icon name="storefront" size={26} />
              )}
            </div>
            <div>
              <div className="flex items-center gap-space-xs">
                <h3 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">
                  {restaurant.name}
                </h3>
                {restaurant.category?.name ? (
                  <span className="rounded-md bg-secondary-fixed px-space-xs py-0.5 font-label-sm text-label-sm text-on-secondary-fixed">
                    {restaurant.category.name}
                  </span>
                ) : null}
              </div>
              {restaurant.city ? (
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {restaurant.city}
                </span>
              ) : null}
            </div>
          </div>
          <Link
            href={`/restaurants/${restaurant.id}`}
            className="hidden items-center gap-1 font-label-md text-label-md text-secondary hover:underline sm:flex"
          >
            <Icon name="menu_book" size={18} />
            View Full Menu
          </Link>
        </div>
      ) : null}

      <div className="flex flex-col gap-space-md">
        {cart.items.map((item) => (
          <CartRow
            key={item.id}
            item={item}
            isMutating={mutatingItemId === item.id}
            onSetQuantity={(q) => onSetQuantity(item.id, q)}
            onRemove={() => onRemove(item.id)}
          />
        ))}
      </div>

      <div className="mt-space-md flex items-center justify-between pt-space-xs">
        {restaurant ? (
          <Link
            href={`/restaurants/${restaurant.id}`}
            className="flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:underline"
          >
            <Icon name="add" size={20} />
            Add more items from {restaurant.name}
          </Link>
        ) : (
          <span />
        )}
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          {cart.items.length} distinct {cart.items.length === 1 ? "dish" : "dishes"} in cart
        </span>
      </div>
    </section>
  );
}

function CartRow({
  item,
  isMutating,
  onSetQuantity,
  onRemove,
}: {
  item: CartItem;
  isMutating: boolean;
  onSetQuantity: (quantity: number) => void;
  onRemove: () => void;
}) {
  const unitPrice = item.variant ? Number(item.variant.price) : Number(item.product.price);
  const lineTotal = unitPrice * item.quantity;
  const image = resolveAssetUrl(item.product.primary_image?.image ?? null);

  return (
    <div className="flex flex-col items-start justify-between gap-space-md rounded-2xl bg-surface-container-low p-space-md sm:flex-row sm:items-center">
      <div className="flex items-start gap-space-md">
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-container-high shadow-card text-on-surface-variant">
          {image ? (
            <Image src={image} alt="" width={80} height={80} className="h-full w-full object-cover" />
          ) : (
            <span className="font-headline-sm text-headline-sm text-on-surface-variant">
              {initialsOf(item.product.name, 1)}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs">
            {item.product.dietary_type ? (
              <span
                className={
                  "flex h-3 w-3 items-center justify-center rounded-sm " +
                  (item.product.dietary_type === "veg" ? "bg-tertiary" : "bg-error")
                }
              />
            ) : null}
            <h4 className="font-label-lg text-label-lg font-bold text-on-surface">
              {item.product.name}
              {item.variant ? ` — ${item.variant.name}` : ""}
            </h4>
          </div>
          {item.product.description ? (
            <p className="mt-1 line-clamp-2 max-w-md font-body-sm text-body-sm text-on-surface-variant">
              {item.product.description}
            </p>
          ) : null}
          <span className="mt-space-xs font-label-md text-label-md font-extrabold text-on-surface">
            {formatMAD(unitPrice)}
          </span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-space-lg sm:w-auto sm:justify-end">
        <div className="flex items-center gap-space-xs">
          <div className="flex items-center rounded-xl bg-surface-container-lowest p-0.5 shadow-card">
            <button
              type="button"
              onClick={() => onSetQuantity(item.quantity - 1)}
              disabled={isMutating || item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface transition-colors hover:bg-surface-container disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Icon name="remove" size={18} />
            </button>
            <span className="w-8 text-center font-label-md text-label-md font-bold text-on-surface">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onSetQuantity(item.quantity + 1)}
              disabled={isMutating}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface transition-colors hover:bg-surface-container disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Icon name="add" size={18} />
            </button>
          </div>
          <button
            type="button"
            onClick={onRemove}
            disabled={isMutating}
            title="Remove item"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-error-container hover:text-on-error-container disabled:opacity-40"
          >
            <Icon name="delete" size={18} />
          </button>
        </div>
        <span className="min-w-[70px] text-right font-label-lg text-label-lg font-extrabold text-on-surface">
          {formatMAD(lineTotal)}
        </span>
      </div>
    </div>
  );
}
