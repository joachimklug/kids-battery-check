import { DEFAULT_LOCALE, normalizeLocale } from './locale.js';
import { TRANSLATIONS } from './translations.js';

export const translate = (locale, key, variables = {}) => {
  const selectedLocale = normalizeLocale(locale) ?? DEFAULT_LOCALE;
  const template = TRANSLATIONS[selectedLocale]?.[key] ?? TRANSLATIONS[DEFAULT_LOCALE]?.[key] ?? key;
  return template.replace(/\{([a-zA-Z0-9_]+)\}/g, (placeholder, variableName) => (
    Object.hasOwn(variables, variableName) ? String(variables[variableName]) : placeholder
  ));
};
