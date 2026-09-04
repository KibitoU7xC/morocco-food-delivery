/**
 * Utility Functions
 * General helpers: className joining, Moroccan Dirham (MAD) formatting, media URLs, dates.
 */

type ClassValue = string | number | false | null | undefined;

/** Join truthy class values into a single className string. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

/** Format an amount as Moroccan Dirham, e.g. `formatMAD("24") -> "24.00 MAD"`. */
export function formatMAD(
  amount: number | string | null | undefined,
  options: { decimals?: number } = {},
): string {
  const value = typeof amount === "string" ? Number(amount) : amount;
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return "—";
  }
  return `${value.toFixed(options.decimals ?? 2)} MAD`;
}

/** Initials for a name, used as an avatar fallback (e.g. "Yassine Benali" -> "YB"). */
export function initialsOf(name: string, max = 2): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, max)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

/** Base URL of the Laravel API's public storage. */
export const API_ASSET_BASE_URL = `${(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "")}/storage`;

/** Resolve a possibly-relative media path from the API to an absolute URL. */
export function resolveAssetUrl(
  path: string | null | undefined,
): string | null {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `${API_ASSET_BASE_URL}/${path.replace(/^\/+/, "")}`;
}

/** Format an ISO date as a short, readable string (e.g. "Sep 2, 2026"). */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Format an ISO date as a relative-ish "date at time" string used on order cards. */
export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart}, ${timePart}`;
}
