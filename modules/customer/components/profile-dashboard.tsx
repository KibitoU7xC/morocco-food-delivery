"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { useCustomerProfile } from "../customer.hooks";
import { useAddresses } from "../addresses/addresses.hooks";
import { useOrders } from "@/modules/orders/orders.hooks";
import { SavedAddresses } from "../addresses/components/saved-addresses";
import { OngoingDeliveryCard } from "@/modules/orders/components/ongoing-delivery-card";
import { RecentOrdersList } from "@/modules/orders/components/recent-orders-list";
import { ProfileHeader } from "./profile-header";
import { PersonalInformation } from "./personal-information";
import { PaymentMethodsCard } from "./payment-methods-card";
import { PreferencesCard } from "./preferences-card";
import { LogoutButton } from "./logout-button";
import { SignedOutState } from "./signed-out-state";
import { useState } from "react";
import type { PaymentMethod } from "@/modules/payments/payments.types";

interface ProfileDashboardProps {
  /** Fetched server-side — GET /api/v1/payment-methods needs no auth. */
  paymentMethods: PaymentMethod[];
}

export function ProfileDashboard({ paymentMethods }: ProfileDashboardProps) {
  const {
    profile,
    isLoading: isProfileLoading,
    error: profileError,
    isAuthenticated,
    isSaving,
    update,
    retry: retryProfile,
  } = useCustomerProfile();

  const addressesState = useAddresses(isAuthenticated === true);
  const ordersState = useOrders(10, isAuthenticated === true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  if (isAuthenticated === null) {
    return <DashboardSkeleton />;
  }

  if (isAuthenticated === false) {
    return <SignedOutState />;
  }

  if (isProfileLoading && !profile) {
    return <DashboardSkeleton />;
  }

  if (!profile) {
    return (
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-space-sm px-gutter-mobile py-space-3xl text-center md:px-gutter-desktop">
        <Icon name="error" size={28} className="text-error" />
        <p className="font-body-md text-body-md text-on-surface-variant">
          {profileError ?? "Couldn't load your profile."}
        </p>
        <button
          type="button"
          onClick={retryProfile}
          className="rounded-xl bg-primary-container px-space-lg py-2 font-label-md text-label-md font-bold text-on-primary-container hover:brightness-95"
        >
          Try again
        </button>
      </div>
    );
  }

  const defaultAddress =
    addressesState.addresses.find((a) => a.is_default) ??
    addressesState.addresses[0] ??
    null;

  return (
    <div className="mx-auto w-full max-w-[1440px] px-gutter-mobile py-space-xl md:px-gutter-desktop">
      <div className="mb-space-lg flex items-center gap-space-xs font-label-md text-on-surface-variant">
        <Link href="/" className="transition-colors hover:text-secondary">
          Home
        </Link>
        <Icon name="chevron_right" size={16} />
        <span className="font-headline-sm text-on-surface">My Account &amp; Profile</span>
      </div>

      <ProfileHeader
        profile={profile}
        ordersTotal={ordersState.pagination?.total ?? ordersState.orders.length}
        addressesTotal={addressesState.addresses.length}
        location={defaultAddress?.city ?? null}
        onEditProfile={() => setIsEditingProfile(true)}
      />

      <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
        <div className="flex flex-col gap-space-md lg:col-span-5">
          <PersonalInformation
            profile={profile}
            isEditing={isEditingProfile}
            onEditToggle={setIsEditingProfile}
            onSave={update}
            isSaving={isSaving}
            error={profileError}
          />
          <SavedAddresses
            addresses={addressesState.addresses}
            isLoading={addressesState.isLoading}
            error={addressesState.error}
            mutatingId={addressesState.mutatingId}
            add={addressesState.add}
            edit={addressesState.edit}
            remove={addressesState.remove}
          />
          <PaymentMethodsCard methods={paymentMethods} />
          <PreferencesCard />
          <LogoutButton />
        </div>

        <div className="flex flex-col gap-space-md lg:col-span-7">
          <OngoingDeliveryCard
            order={ordersState.ongoingOrder}
            isLoading={ordersState.isLoading}
          />
          <RecentOrdersList
            orders={ordersState.recentOrders}
            pagination={ordersState.pagination}
            isLoading={ordersState.isLoading}
            error={ordersState.error}
            onRetry={ordersState.retry}
          />
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-gutter-mobile py-space-xl md:px-gutter-desktop">
      <div className="mb-space-xl h-40 animate-pulse rounded-3xl bg-surface-container-lowest shadow-card" />
      <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12">
        <div className="flex flex-col gap-space-md lg:col-span-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-3xl bg-surface-container-lowest shadow-card" />
          ))}
        </div>
        <div className="flex flex-col gap-space-md lg:col-span-7">
          {[0, 1].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-3xl bg-surface-container-lowest shadow-card" />
          ))}
        </div>
      </div>
    </div>
  );
}
