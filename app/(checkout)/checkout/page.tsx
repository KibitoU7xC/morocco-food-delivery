/**
 * Cart & Checkout — combined page (the reference design treats these as one
 * screen, breadcrumbed "Cart & Checkout"; `/cart` redirects here rather than
 * duplicating the same UI — see app/(checkout)/cart/page.tsx).
 *
 * Sections & sources:
 * - Delivery Address ................ GET /api/v1/customer/addresses
 * - Cart items (qty/remove) ......... GET /api/v1/cart, PUT /cart/update/{id}, DELETE /cart/delete/{id}
 * - Order preferences ............... local state, folded into `special_instructions`
 * - Payment Method ................... GET /api/v1/payment-methods (+ GET /customer/wallet for balance)
 * - Coupons & Vouchers ............... POST /api/v1/promocodes/apply
 * - Bill Details ..................... GET /api/v1/orders/summary
 * - Courier tip ....................... local state only — no backend field yet
 * - Proceed to Pay ................... POST /api/v1/orders/place-order
 *
 * Auth is a Bearer token in localStorage (no server session), so — like the
 * profile dashboard — everything here runs client-side; see CheckoutPage.
 */

import type { Metadata } from "next";
import { HomeNavbar, HomeFooter } from "@/modules/home";
import { CheckoutPage } from "@/modules/orders/components/checkout-page";
import { getPaymentMethods } from "@/modules/payments/payments.api";

export const metadata: Metadata = {
  title: "Cart & Checkout - Orders au Maroc",
  description: "Review your order, choose a delivery address and payment method, and check out.",
};

export default async function Checkout() {
  const paymentMethods = await getPaymentMethods().catch(() => []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HomeNavbar />
      <main className="w-full flex-1">
        <CheckoutPage paymentMethods={paymentMethods} />
      </main>
      <HomeFooter />
    </div>
  );
}
