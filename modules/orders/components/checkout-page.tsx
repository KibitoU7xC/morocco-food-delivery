"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { PageContainer } from "@/components/ui/page-container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { formatMAD } from "@/lib/utils";
import { useCustomerProfile } from "@/modules/customer/customer.hooks";
import { SignedOutState } from "@/modules/customer/components/signed-out-state";
import { useAddresses } from "@/modules/customer/addresses/addresses.hooks";
import { AddressSelector } from "@/modules/customer/addresses/components/address-selector";
import { useWallet } from "@/modules/customer/wallet/wallet.hooks";
import { useCart } from "@/modules/cart/cart.hooks";
import { CartItemsList } from "@/modules/cart/components/cart-items-list";
import { PaymentMethodSelector } from "@/modules/payments/components/payment-method-selector";
import { usePromoCode } from "@/modules/promocodes/promocodes.hooks";
import { PromoCodeBox } from "@/modules/promocodes/components/promo-code-box";
import { useOrderSummary, usePlaceOrder } from "../orders.hooks";
import { BillDetails } from "./bill-details";
import { CourierTipSelector } from "./courier-tip-selector";
import {
  OrderPreferencesFields,
  type OrderPreferences,
} from "./order-preferences";
import type { PaymentMethod } from "@/modules/payments/payments.types";

interface CheckoutPageProps {
  /** Fetched server-side — GET /api/v1/payment-methods needs no auth. */
  paymentMethods: PaymentMethod[];
}

export function CheckoutPage({ paymentMethods }: CheckoutPageProps) {
  const router = useRouter();
  const { isAuthenticated } = useCustomerProfile();
  const signedIn = isAuthenticated === true;

  // If user logs out while on cart/checkout, redirect directly to home screen
  useEffect(() => {
    const handleAuthChange = () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
      if (!token) {
        router.push("/");
        router.refresh();
      }
    };
    window.addEventListener("auth_updated", handleAuthChange);
    return () => window.removeEventListener("auth_updated", handleAuthChange);
  }, [router]);

  const cartState = useCart(signedIn);
  const addressesState = useAddresses(signedIn);
  const { wallet } = useWallet(signedIn);
  const promo = usePromoCode();
  const placeOrderState = usePlaceOrder();

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [paymentCode, setPaymentCode] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [preferences, setPreferences] = useState<OrderPreferences>({
    noCutlery: true,
    contactlessDelivery: false,
  });
  const [tip, setTip] = useState(0);

  // Default to the customer's default address once addresses load.
  useEffect(() => {
    if (selectedAddressId !== null) return;
    const first = addressesState.addresses.find((a) => a.is_default) ?? addressesState.addresses[0];
    if (first) setSelectedAddressId(first.id);
  }, [addressesState.addresses, selectedAddressId]);

  // Default to the first available payment method once they load.
  useEffect(() => {
    if (paymentCode !== null) return;
    if (paymentMethods[0]) setPaymentCode(paymentMethods[0].code);
  }, [paymentMethods, paymentCode]);

  const summaryState = useOrderSummary({
    customerAddressId: selectedAddressId,
    promoCode: promo.appliedCode,
    enabled: signedIn && !cartState.isEmpty && selectedAddressId !== null,
  });

  const specialInstructions = useMemo(() => {
    const parts: string[] = [];
    if (preferences.noCutlery) parts.push("Don't send plastic cutlery.");
    if (preferences.contactlessDelivery) parts.push("Contactless delivery — leave at door.");
    if (note.trim()) parts.push(note.trim());
    return parts.join(" ") || undefined;
  }, [preferences, note]);

  const handleQuantityChange = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    await cartState.setQuantity(itemId, quantity);
    summaryState.refresh();
  };

  const handleRemove = async (itemId: number) => {
    await cartState.removeItem(itemId);
    summaryState.refresh();
  };

  const canPlaceOrder =
    !!summaryState.summary &&
    !!selectedAddressId &&
    !!paymentCode &&
    !placeOrderState.isPlacing;

  const handlePlaceOrder = async () => {
    if (!selectedAddressId || !paymentCode || !summaryState.summary) return;
    const order = await placeOrderState.submit({
      customer_address_id: selectedAddressId,
      payment_method: paymentCode,
      special_instructions: specialInstructions,
      qoute_key: summaryState.summary.price_rule_data?.distance_matrix_data?.quote_key,
      promo_code: promo.appliedCode ?? undefined,
    });
    if (order) {
      cartState.refresh();
    }
  };

  if (isAuthenticated === null) {
    return <CheckoutSkeleton />;
  }

  if (isAuthenticated === false) {
    return <SignedOutState />;
  }

  if (placeOrderState.placedOrder) {
    return <OrderConfirmed orderNumber={placeOrderState.placedOrder.order_number} />;
  }

  return (
    <PageContainer>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart & Checkout" }]} />

      {cartState.error ? (
        <ErrorBanner message={cartState.error} onRetry={cartState.refresh} />
      ) : cartState.isLoading ? (
        <CheckoutSkeleton />
      ) : cartState.isEmpty ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
          <div className="flex flex-col gap-space-xl lg:col-span-8">
            <AddressSelector
              addresses={addressesState.addresses}
              isLoading={addressesState.isLoading}
              error={addressesState.error}
              mutatingId={addressesState.mutatingId}
              selectedId={selectedAddressId}
              onSelect={setSelectedAddressId}
              add={addressesState.add}
              note={note}
              onNoteChange={setNote}
            />

            <div className="flex flex-col gap-0">
              <CartItemsList
                cart={cartState.cart!}
                mutatingItemId={cartState.mutatingItemId}
                onSetQuantity={handleQuantityChange}
                onRemove={handleRemove}
              />
              <div className="-mt-space-xl rounded-b-2xl bg-surface-container-lowest px-space-xl pb-space-xl shadow-card">
                <OrderPreferencesFields value={preferences} onChange={setPreferences} />
              </div>
            </div>

            <PaymentMethodSelector
              methods={paymentMethods}
              wallet={wallet}
              selected={paymentCode}
              onSelect={setPaymentCode}
            />
          </div>

          <div className="flex flex-col gap-space-md lg:sticky lg:top-24 lg:col-span-4">
            <PromoCodeBox
              appliedCode={promo.appliedCode}
              result={promo.result}
              isApplying={promo.isApplying}
              error={promo.error}
              onApply={promo.apply}
              onRemove={promo.remove}
            />

            <BillDetails
              summary={summaryState.summary}
              isLoading={summaryState.isLoading}
              error={summaryState.error}
              hint={
                !selectedAddressId
                  ? "Select a delivery address to see your bill."
                  : null
              }
            />

            {placeOrderState.error ? (
              <p className="rounded-xl bg-error-container px-space-sm py-space-xs font-body-sm text-body-sm text-on-error-container">
                {placeOrderState.error}
              </p>
            ) : null}

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={!canPlaceOrder}
              className="flex w-full items-center justify-between rounded-2xl bg-primary-container px-space-lg py-space-md font-headline-sm text-headline-sm font-extrabold text-on-surface shadow-md transition-all hover:bg-primary-fixed-dim hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex items-center gap-space-xs">
                <Icon name="lock" size={24} />
                {placeOrderState.isPlacing ? "Placing order…" : "Proceed to Pay"}
              </span>
              {summaryState.summary ? (
                <span className="flex items-center gap-space-xs">
                  {formatMAD(summaryState.summary.total_amount)}
                  <Icon name="arrow_forward" size={20} />
                </span>
              ) : null}
            </button>

            <div className="flex items-start gap-space-xs text-on-surface-variant">
              <Icon name="timer" size={18} className="mt-0.5 flex-shrink-0 text-outline-variant" />
              <p className="font-body-sm text-body-sm">
                <strong>Order Flexibility:</strong> Cancellations are permitted with 100%
                refund within 60 seconds after dispatch acknowledgment.
              </p>
            </div>

            <div className="flex items-center justify-around rounded-xl bg-surface-container-low p-space-sm text-center">
              <TrustBadge icon="restaurant" color="text-tertiary" title="100% Halal" subtitle="Moroccan Verified" />
              <div className="h-8 w-px bg-surface-container-highest" />
              <TrustBadge icon="security" color="text-secondary" title="3D-Secure" subtitle="CMI Protected" />
              <div className="h-8 w-px bg-surface-container-highest" />
              <TrustBadge icon="radar" color="text-primary" title="Live GPS" subtitle="Realtime Courier" />
            </div>

            <CourierTipSelector value={tip} onChange={setTip} />
          </div>
        </div>
      )}
    </PageContainer>
  );
}

function TrustBadge({
  icon,
  color,
  title,
  subtitle,
}: {
  icon: "restaurant" | "security" | "radar";
  color: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <Icon name={icon} size={22} className={color} />
      <span className="mt-1 font-label-sm text-label-sm font-bold text-on-surface">{title}</span>
      <span className="text-[10px] leading-none text-on-surface-variant">{subtitle}</span>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-space-sm rounded-3xl bg-surface-container-lowest p-space-2xl text-center shadow-card">
      <Icon name="shopping_bag" size={32} className="text-on-surface-variant" />
      <h2 className="font-headline-sm text-headline-sm text-on-surface">Your cart is empty</h2>
      <p className="max-w-sm font-body-md text-body-md text-on-surface-variant">
        Browse restaurants and add a few dishes — they&apos;ll show up here ready for checkout.
      </p>
      <Link
        href="/"
        className="mt-space-xs rounded-xl bg-primary-container px-space-lg py-2.5 font-label-md text-label-md font-bold text-on-primary-container hover:brightness-95"
      >
        Browse restaurants
      </Link>
    </div>
  );
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-space-sm rounded-3xl bg-surface-container-lowest p-space-2xl text-center shadow-card">
      <Icon name="error" size={28} className="text-error" />
      <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-xl bg-primary-container px-space-lg py-2 font-label-md text-label-md font-bold text-on-primary-container hover:brightness-95"
      >
        Try again
      </button>
    </div>
  );
}

function OrderConfirmed({ orderNumber }: { orderNumber: string }) {
  return (
    <PageContainer className="flex flex-col items-center gap-space-md py-space-3xl text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-tertiary text-on-tertiary">
        <Icon name="check_circle" size={36} />
      </span>
      <h1 className="font-headline-lg text-headline-lg text-on-surface">Order Confirmed!</h1>
      <p className="max-w-sm font-body-md text-body-md text-on-surface-variant">
        Your order <strong className="text-on-surface">#{orderNumber}</strong> has been placed.
        Track it anytime from your account.
      </p>
      <div className="mt-space-xs flex items-center gap-space-sm">
        <Link
          href="/profile"
          className="rounded-xl bg-primary-container px-space-lg py-2.5 font-label-md text-label-md font-bold text-on-primary-container hover:brightness-95"
        >
          View my orders
        </Link>
        <Link
          href="/"
          className="rounded-xl bg-surface-container-low px-space-lg py-2.5 font-label-md text-label-md text-on-surface hover:bg-surface-container"
        >
          Keep browsing
        </Link>
      </div>
    </PageContainer>
  );
}

function CheckoutSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12">
      <div className="flex flex-col gap-space-xl lg:col-span-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-48 animate-pulse rounded-2xl bg-surface-container-lowest shadow-card" />
        ))}
      </div>
      <div className="flex flex-col gap-space-md lg:col-span-4">
        {[0, 1].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl bg-surface-container-lowest shadow-card" />
        ))}
      </div>
    </div>
  );
}
