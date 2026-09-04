import { cn } from "@/lib/utils";

/**
 * Shared page-content wrapper. `max-w-7xl` matches the real, live shell
 * (HomeNavbar / HomeFooter in modules/home both use max-w-7xl) — use this on
 * every page's content instead of a one-off max-width, or the content column
 * won't line up under the header/footer.
 */
export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-gutter-mobile py-space-xl lg:px-margin-desktop",
        className,
      )}
    >
      {children}
    </div>
  );
}
