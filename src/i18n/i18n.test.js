import test from 'node:test';
import assert from 'node:assert/strict';
import { getInitialLocale, normalizeLocale, resolvePreferredLocale } from './locale.js';
import { translate } from './i18n.js';
import { TRANSLATIONS } from './translations.js';

test('preferred language detection supports regional German and English locales', () => {
  assert.equal(resolvePreferredLocale(['de-DE', 'en-US']), 'de');
  assert.equal(resolvePreferredLocale(['fr-FR', 'en-GB']), 'en');
  assert.equal(resolvePreferredLocale(['fr-FR']), 'en');
  assert.equal(normalizeLocale('DE_at'), 'de');
});

test('a saved language overrides the current browser preference', () => {
  assert.equal(getInitialLocale({ storedLocale: 'en', preferredLanguages: ['de-DE'] }), 'en');
  assert.equal(getInitialLocale({ storedLocale: 'unsupported', preferredLanguages: ['de-DE'] }), 'de');
});

test('translations interpolate variables and fall back safely to English', () => {
  assert.equal(translate('de', 'result.energyStars', { count: 2 }), '2 von 3 Energiesternen');
  assert.equal(translate('fr', 'result.done'), 'Done');
  assert.equal(translate('de', 'missing.key'), 'missing.key');
});

test('German and English catalogs contain the same translation keys', () => {
  assert.deepEqual(Object.keys(TRANSLATIONS.de).sort(), Object.keys(TRANSLATIONS.en).sort());
});
