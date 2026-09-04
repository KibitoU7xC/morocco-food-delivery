import { Icon, type IconName } from "@/components/ui/icon";
import { cn, formatMAD } from "@/lib/utils";
import type { PaymentMethod } from "../payments.types";
import type { WalletData } from "@/modules/customer/wallet/wallet.types";

const METHOD_ICON: Record<string, IconName> = {
  cod: "payments",
  wallet: "account_balance_wallet",
  stripe: "credit_card",
};

const METHOD_ICON_COLOR: Record<string, string> = {
  cod: "text-primary",
  wallet: "text-tertiary",
  stripe: "text-secondary",
};

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  wallet: WalletData | null;
  selected: string | null;
  onSelect: (code: string) => void;
}

/**
 * The live API only returns Cash On Delivery + Wallet as payment method
 * types (no card/Stripe instrument exists server-side yet), so unlike the
 * reference design there's no saved-card option here — only what the
 * backend actually offers.
 */
export function PaymentMethodSelector({
  methods,
  wallet,
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <section className="rounded-2xl bg-surface-container-lowest p-space-xl shadow-card">
      <div className="mb-space-lg flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-fixed text-secondary">
            <Icon name="credit_card" size={20} />
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm font-extrabold text-on-surface">
              Payment Method
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Safe transactions supported by national banking gateway
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-tertiary-fixed px-space-xs py-0.5 font-label-sm text-label-sm font-bold text-on-tertiary-fixed">
          <Icon name="lock" size={16} />
          Secured by CMI Morocco
        </div>
      </div>

      {methods.length === 0 ? (
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          No payment methods available right now.
        </p>
      ) : (
        <div className="flex flex-col gap-space-md">
          {methods.map((method) => {
            const isSelected = selected === method.code;
            const isWallet = method.code === "wallet";
            return (
              <label
                key={method.id}
                className={cn(
                  "relative flex cursor-pointer items-start justify-between rounded-2xl p-space-md transition-all",
                  isSelected
                    ? "bg-surface-container-low"
                    : "bg-surface-container-lowest hover:bg-surface-container-low",
                )}
              >
                <div className="flex items-start gap-space-md">
                  <input
                    type="radio"
                    name="payment-method"
                    checked={isSelected}
                    onChange={() => onSelect(method.code)}
                    className="mt-1 h-5 w-5 accent-secondary"
                  />
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-space-xs">
                      <span className="font-label-lg text-label-lg font-bold text-on-surface">
                        {method.name}
                      </span>
                      {isWallet && wallet ? (
                        <span className="rounded-md bg-primary-fixed px-space-xs py-0.5 font-label-sm text-label-sm font-bold text-on-primary-fixed">
                          Balance: {formatMAD(wallet.balance)}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                      {method.description}
                    </p>
                  </div>
                </div>
                <Icon
                  name={METHOD_ICON[method.code] ?? "payments"}
                  size={24}
                  className={METHOD_ICON_COLOR[method.code] ?? "text-on-surface-variant"}
                />
              </label>
            );
          })}
        </div>
      )}
    </section>
  );
}
