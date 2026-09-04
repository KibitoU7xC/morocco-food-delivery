import { Icon } from "@/components/ui/icon";

export interface OrderPreferences {
  noCutlery: boolean;
  contactlessDelivery: boolean;
}

interface OrderPreferencesFieldsProps {
  value: OrderPreferences;
  onChange: (value: OrderPreferences) => void;
}

/**
 * There's no dedicated API field for these — they get folded into the free-text
 * `special_instructions` sent with POST /orders/place-order (see checkout-page.tsx).
 */
export function OrderPreferencesFields({ value, onChange }: OrderPreferencesFieldsProps) {
  return (
    <div className="mt-space-lg flex flex-col justify-between gap-space-md rounded-2xl bg-surface-container p-space-md pt-space-md md:flex-row">
      <label className="flex cursor-pointer select-none items-center gap-space-sm">
        <input
          type="checkbox"
          checked={value.noCutlery}
          onChange={(e) => onChange({ ...value, noCutlery: e.target.checked })}
          className="h-5 w-5 rounded-md accent-secondary"
        />
        <div className="flex flex-col">
          <span className="flex items-center gap-1 font-label-md text-label-md font-bold text-on-surface">
            <Icon name="eco" size={18} className="text-tertiary" />
            Don&apos;t send plastic cutlery
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Help reduce single-use plastic waste.
          </span>
        </div>
      </label>
      <label className="flex cursor-pointer select-none items-center gap-space-sm">
        <input
          type="checkbox"
          checked={value.contactlessDelivery}
          onChange={(e) => onChange({ ...value, contactlessDelivery: e.target.checked })}
          className="h-5 w-5 rounded-md accent-secondary"
        />
        <div className="flex flex-col">
          <span className="flex items-center gap-1 font-label-md text-label-md font-bold text-on-surface">
            <Icon name="door_front" size={18} className="text-secondary" />
            Contactless Delivery
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Rider leaves order at the doorstep and calls you.
          </span>
        </div>
      </label>
    </div>
  );
}
