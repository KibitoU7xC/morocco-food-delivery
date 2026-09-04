import Link from "next/link";
import { Icon } from "./icon";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Shared breadcrumb trail — same style everywhere (profile, checkout, ...). */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="mb-space-lg flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-space-xs">
            {isLast ? (
              <span className="font-bold text-on-surface">{item.label}</span>
            ) : (
              <Link
                href={item.href ?? "#"}
                className="flex items-center gap-1 transition-colors hover:text-on-surface"
              >
                {isFirst ? <Icon name="home" size={16} /> : null}
                {item.label}
              </Link>
            )}
            {!isLast ? <Icon name="chevron_right" size={14} /> : null}
          </span>
        );
      })}
    </nav>
  );
}
