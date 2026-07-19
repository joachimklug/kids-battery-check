export const SUPPORTED_LOCALES = Object.freeze(['en', 'de']);
export const DEFAULT_LOCALE = 'en';

export const normalizeLocale = (locale) => {
  if (typeof locale !== 'string') return null;
  const language = locale.trim().toLowerCase().split(/[-_]/)[0];
  return SUPPORTED_LOCALES.includes(language) ? language : null;
};

export const resolvePreferredLocale = (preferredLanguages = []) => {
  for (const language of preferredLanguages) {
    const locale = normalizeLocale(language);
    if (locale) return locale;
  }
  return DEFAULT_LOCALE;
};

export const getInitialLocale = ({ storedLocale, preferredLanguages = [] } = {}) => (
  normalizeLocale(storedLocale) ?? resolvePreferredLocale(preferredLanguages)
);
