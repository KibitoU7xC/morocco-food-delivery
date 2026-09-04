"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { useLanguage } from "@/lib/context/language-context";

const LANGUAGE_LABEL = { EN: "English (US)", FR: "Français" } as const;
const NOTIFICATIONS_KEY = "orders_ma_notifications_enabled";

/**
 * Language is wired to the app's real LanguageProvider (EN/FR — the same
 * switcher used in the header). Notifications have no backend endpoint yet,
 * so the toggle is a local, per-device preference stored in localStorage.
 */
export function PreferencesCard() {
  const { lang, setLang } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(NOTIFICATIONS_KEY);
      if (stored !== null) setNotificationsEnabled(stored === "true");
    } catch {
      // ignore
    }
  }, []);

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(NOTIFICATIONS_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-space-md rounded-3xl bg-surface-container-lowest p-space-lg shadow-card">
      <div className="flex items-center justify-between border-b border-surface-container pb-space-xs">
        <h3 className="flex items-center gap-2 font-headline-sm text-headline-sm text-on-surface">
          <Icon name="settings" size={20} className="text-on-surface-variant" />
          Preferences
        </h3>
      </div>
      <div className="flex flex-col gap-space-sm text-body-sm">
        <div className="flex items-center justify-between py-1">
          <span className="flex items-center gap-1.5 text-on-surface-variant">
            <Icon name="translate" size={16} />
            Language
          </span>
          <div className="flex items-center gap-1">
            {(Object.keys(LANGUAGE_LABEL) as (keyof typeof LANGUAGE_LABEL)[]).map(
              (code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={
                    "rounded px-2 py-1 font-label-sm text-label-sm transition-colors " +
                    (lang === code
                      ? "bg-secondary-fixed font-bold text-on-secondary-fixed"
                      : "text-on-surface-variant hover:text-on-surface")
                  }
                >
                  {code}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="flex items-center gap-1.5 text-on-surface-variant">
            <Icon name="notifications" size={16} />
            Notifications
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={notificationsEnabled}
            onClick={toggleNotifications}
            className={
              "relative h-6 w-11 flex-shrink-0 rounded-full transition-colors " +
              (notificationsEnabled ? "bg-secondary" : "bg-surface-container-highest")
            }
          >
            <span
              className={
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-card transition-transform " +
                (notificationsEnabled ? "translate-x-[22px]" : "translate-x-0.5")
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}
