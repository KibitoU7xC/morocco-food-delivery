import { Icon, type IconName } from "@/components/ui/icon";
import type { PaymentMethod } from "@/modules/payments/payments.types";

const METHOD_ICON: Record<string, IconName> = {
  cod: "payments",
  wallet: "account_balance_wallet",
  stripe: "credit_card",
};

/**
 * Read-only list of accepted payment methods (GET /api/v1/payment-methods).
 * The live API returns method TYPES, not a customer's saved cards — there's no
 * documented endpoint for stored payment instruments, so this card doesn't
 * pretend to have a "Manage" action.
 */
export function PaymentMethodsCard({ methods }: { methods: PaymentMethod[] }) {
  return (
    <div className="flex flex-col gap-space-md rounded-3xl bg-surface-container-lowest p-space-lg shadow-card">
      <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
        <h3 className="flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface">
          <Icon name="account_balance_wallet" size={20} className="text-secondary" />
          Payment Methods
        </h3>
      </div>

      {methods.length === 0 ? (
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          No payment methods available right now.
        </p>
      ) : (
        <div className="flex flex-col gap-space-sm font-body-sm">
          {methods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between rounded-2xl bg-surface-container-low p-space-sm"
            >
              <div className="flex items-center gap-2">
                <Icon
                  name={METHOD_ICON[method.code] ?? "payments"}
                  size={20}
                  className={method.code === "wallet" ? "text-tertiary" : "text-on-surface-variant"}
                />
                <span className="font-label-md text-on-surface">{method.name}</span>
              </div>
              <span className="text-[12px] text-on-surface-variant">Available</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
