import Link from "next/link";
import { Icon } from "@/components/ui/icon";

/** Shown on /profile when there's no auth token in localStorage. */
export function SignedOutState() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-space-md px-gutter-mobile py-space-3xl text-center md:px-gutter-desktop">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-fixed text-secondary">
        <Icon name="person" size={32} />
      </span>
      <h1 className="font-headline-lg text-headline-lg text-on-surface">
        Sign in to view your profile
      </h1>
      <p className="max-w-sm font-body-md text-body-md text-on-surface-variant">
        Your account, saved addresses, payment methods and order history are
        waiting for you — sign in with your phone number to pick up where you
        left off.
      </p>
      <Link
        href="/login"
        className="mt-space-xs flex items-center gap-1.5 rounded-xl bg-primary-container px-space-xl py-3 font-label-lg text-label-lg text-on-primary-container transition-all hover:brightness-95"
      >
        <Icon name="login" size={18} />
        Sign In
      </Link>
    </div>
  );
}
