import Link from "next/link";
import { Icon } from "./icon";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/** Shared breadcrumb trail — same style everywhere across the whole project (profile, checkout, restaurants, restaurant detail). */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "mb-space-lg flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant",
        className
      )}
    >
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-space-xs">
            {isLast ? (
              <span className="font-bold text-on-surface truncate max-w-[260px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href ?? "#"}
                className="flex items-center gap-1 transition-colors hover:text-on-surface"
              >
                {isFirst ? <Icon name="home" size={16} /> : null}
                <span>{item.label}</span>
              </Link>
            )}
            {!isLast ? (
              <Icon
                name="chevron_right"
                size={14}
                className="text-on-surface-variant/70 shrink-0"
              />
            ) : null}
          </span>
        );
      })}
    </nav>
  );
}

