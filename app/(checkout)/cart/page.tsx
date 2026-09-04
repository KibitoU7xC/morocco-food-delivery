/**
 * Shopping Cart
 * The reference design (design/cart-checkout) treats cart + checkout as a
 * single "Cart & Checkout" screen, so /cart just redirects to the combined
 * page at /checkout rather than duplicating it — see app/(checkout)/checkout/page.tsx.
 */

import { redirect } from "next/navigation";

export default function CartPage() {
  redirect("/checkout");
}
