import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getInitialLocale, normalizeLocale } from './locale.js';
import { translate } from './i18n.js';

const STORAGE_KEY = 'lumo.locale';
const I18nContext = createContext(null);

const readStoredLocale = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const detectInitialLocale = () => getInitialLocale({
  storedLocale: readStoredLocale(),
  preferredLanguages: navigator.languages?.length ? navigator.languages : [navigator.language],
});

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(detectInitialLocale);

  const setLocale = useCallback((nextLocale) => {
    const normalizedLocale = normalizeLocale(nextLocale);
    if (!normalizedLocale) return;
    setLocaleState(normalizedLocale);
    try {
      window.localStorage.setItem(STORAGE_KEY, normalizedLocale);
    } catch {
      // Language selection still works when storage is unavailable.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback((key, variables) => translate(locale, key, variables), [locale]);
  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
