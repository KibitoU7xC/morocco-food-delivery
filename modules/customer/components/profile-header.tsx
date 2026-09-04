import { Icon } from "@/components/ui/icon";
import { initialsOf } from "@/lib/utils";
import type { CustomerProfile } from "../customer.types";

interface ProfileHeaderProps {
  profile: CustomerProfile;
  ordersTotal: number;
  addressesTotal: number;
  /** City from the default saved address, when one exists. */
  location: string | null;
  onEditProfile: () => void;
}

/**
 * Profile header card. Stats are all derived from real data (orders count,
 * addresses count, member-since year) — the design's "Orders Gold" badge and
 * "Saved MAD" stat have no backend source, so a verified badge (from the real
 * `is_active` flag) and "Member since" stand in for them.
 */
export function ProfileHeader({
  profile,
  ordersTotal,
  addressesTotal,
  location,
  onEditProfile,
}: ProfileHeaderProps) {
  const memberSinceYear = new Date(profile.created_at).getFullYear();
  const memberSince = Number.isFinite(memberSinceYear) ? memberSinceYear : null;

  return (
    <section className="mb-space-xl rounded-3xl bg-surface-container-lowest p-space-lg shadow-card md:p-space-xl">
      <div className="flex flex-col justify-between gap-space-xl lg:flex-row lg:items-center">
        <div className="flex flex-col gap-space-lg sm:flex-row sm:items-center">
          <div className="relative flex-shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-fixed to-secondary-fixed shadow-card md:h-24 md:w-24">
              <span className="font-headline-lg text-headline-lg font-extrabold text-on-primary-fixed-variant">
                {initialsOf(profile.name) || <Icon name="person" size={32} />}
              </span>
            </div>
            {profile.is_active ? (
              <span
                title="Verified account"
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-card"
              >
                <Icon name="verified" size={16} />
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-space-xs">
              <h1 className="font-headline-lg text-headline-lg text-on-surface">
                {profile.name}
              </h1>
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-space-md gap-y-1 font-body-sm text-body-sm text-on-surface-variant">
              <span className="flex items-center gap-1">
                <Icon name="call" size={16} className="text-tertiary" />
                {profile.country_code} {profile.mobile}
              </span>
              <span className="text-surface-container-highest">•</span>
              <span className="flex items-center gap-1">
                <Icon name="mail" size={16} className="text-secondary" />
                {profile.email}
              </span>
              {location ? (
                <>
                  <span className="text-surface-container-highest">•</span>
                  <span className="flex items-center gap-1">
                    <Icon name="location_on" size={16} className="text-primary" />
                    {location}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-space-md sm:flex-row sm:items-center">
          <div className="grid grid-cols-3 gap-space-sm rounded-2xl bg-surface-container-low p-space-sm">
            <Stat value={ordersTotal} label="Orders" />
            <Stat value={addressesTotal} label="Addresses" accent="text-secondary" highlight />
            <Stat
              value={memberSince ?? "—"}
              label="Member since"
              accent="text-tertiary"
            />
          </div>
          <button
            type="button"
            onClick={onEditProfile}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-surface-container-high px-space-md py-2.5 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-highest"
          >
            <Icon name="edit" size={18} />
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  accent,
  highlight,
}: {
  value: string | number;
  label: string;
  accent?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "flex flex-col px-space-xs py-0.5 text-center" +
        (highlight ? " rounded-xl bg-surface-container-lowest/60 shadow-card" : "")
      }
    >
      <span className={`font-headline-lg text-headline-lg text-on-surface ${accent ?? ""}`}>
        {value}
      </span>
      <span className="font-label-sm text-[11px] text-on-surface-variant">{label}</span>
    </div>
  );
}
