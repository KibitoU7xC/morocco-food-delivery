/**
 * Customer Profile & Account Dashboard.
 *
 * Sections & sources:
 * - Profile header (avatar, stats, Edit Profile) ... GET /api/v1/customer/profile
 * - Personal Information (editable) ............... GET/PUT /api/v1/customer/profile
 * - Saved Addresses (add/edit/delete) .............. GET/POST/PUT/DELETE /api/v1/customer/addresses
 * - Payment Methods ................................ GET /api/v1/payment-methods
 * - Preferences (language live; notifications local — no backend for either yet)
 * - Ongoing Delivery + Recent Orders ............... GET /api/v1/orders
 *
 * The API has no cookie/session — auth is a Bearer token in localStorage — so
 * everything above the fold that depends on "who's signed in" has to run on
 * the client (see ProfileDashboard). Payment methods don't need auth, so those
 * are fetched here on the server and passed down.
 */

import type { Metadata } from "next";
import { HomeNavbar, HomeFooter } from "@/modules/home";
import { ProfileDashboard } from "@/modules/customer/components/profile-dashboard";
import { getPaymentMethods } from "@/modules/payments/payments.api";

export const metadata: Metadata = {
  title: "My Account & Profile - Orders au Maroc",
  description:
    "Manage your Orders.ma profile, saved addresses, payment methods and order history.",
};

export default async function ProfilePage() {
  const paymentMethods = await getPaymentMethods().catch(() => []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HomeNavbar />
      <main className="flex-1 w-full">
        <ProfileDashboard paymentMethods={paymentMethods} />
      </main>
      <HomeFooter />
    </div>
  );
}
