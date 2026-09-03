'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'FR';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'EN',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('EN');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Read session-based language
        const sessionLang = sessionStorage.getItem('app_lang') as Language;
        if (sessionLang === 'EN' || sessionLang === 'FR') {
          setLangState(sessionLang);
        } else {
          // Check if googtrans cookie is already set
          const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/i);
          if (match && match[1]) {
            const detected = match[1].toUpperCase() as Language;
            if (detected === 'EN' || detected === 'FR') {
              setLangState(detected);
              sessionStorage.setItem('app_lang', detected);
            }
          }
        }
      } catch {
        // ignore storage errors
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      try {
        // Session-based storage
        sessionStorage.setItem('app_lang', newLang);

        const targetCode = newLang.toLowerCase();
        const host = window.location.hostname;

        // Set Google Translate session cookies
        document.cookie = `googtrans=/en/${targetCode}; path=/;`;
        if (host && host !== 'localhost') {
          document.cookie = `googtrans=/en/${targetCode}; domain=.${host}; path=/;`;
        }

        // Trigger Google Translate dropdown element directly if rendered
        const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
        if (select) {
          select.value = targetCode;
          select.dispatchEvent(new Event('change'));
        } else {
          // Trigger browser reload with the new translation cookie active
          window.location.reload();
        }
      } catch {
        // ignore
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
