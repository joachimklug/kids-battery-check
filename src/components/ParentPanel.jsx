import React from 'react';
import { CheckIcon, CloseIcon, GlobeIcon, MoonIcon, ShieldIcon, VolumeIcon } from './Icons.jsx';
import { ENERGY_LEVELS } from '../core/energy.js';
import { useI18n } from '../i18n/I18nProvider.jsx';

const ENERGY_SEGMENTS = [1, 2, 3, 4, 5];

export function ParentPanel({ selectedLevel, onSelectLevel, soundEnabled, onSoundToggle, onClose, onPrime }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <div className="panel-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="parent-panel" role="dialog" aria-modal="true" aria-labelledby="parent-title">
        <div className="parent-panel__handle" aria-hidden="true" />
        <header className="parent-panel__header">
          <div className="parent-panel__title-row">
            <span className="parent-panel__badge"><MoonIcon size={18} /></span>
            <div>
              <p>{t('parent.kicker')}</p>
              <h2 id="parent-title">{t('parent.title')}</h2>
            </div>
          </div>
          <button className="icon-button icon-button--light" type="button" onClick={onClose} aria-label={t('parent.close')}><CloseIcon size={20} /></button>
        </header>

        <p className="parent-panel__intro">{t('parent.intro')}</p>

        <div className="energy-ladder" role="radiogroup" aria-label={t('parent.chooseResult')}>
          {Object.values(ENERGY_LEVELS).map((level) => (
            <button
              className={`energy-choice energy-choice--${level.id} ${selectedLevel === level.id ? 'is-selected' : ''}`}
              type="button"
              role="radio"
              aria-checked={selectedLevel === level.id}
              key={level.id}
              onClick={() => onSelectLevel(level.id)}
              style={{ '--energy-color': level.color }}
            >
              <span className="energy-choice__art"><img src={level.scene} alt="" /></span>
              <span className="energy-choice__copy">
                <strong>{t(`energy.${level.id}.label`)}</strong>
                <small>{t(`energy.${level.id}.parentHint`)}</small>
              </span>
              <span className="energy-choice__meter" aria-hidden="true">
                {ENERGY_SEGMENTS.map((segment) => (
                  <i className={segment <= level.segments ? 'is-filled' : ''} key={segment}>✦</i>
                ))}
              </span>
              <span className="energy-choice__check"><CheckIcon size={14} /></span>
            </button>
          ))}
        </div>

        <div className="parent-settings">
          <button type="button" className="setting-row" onClick={onSoundToggle} aria-pressed={soundEnabled}>
            <span className="setting-row__icon"><VolumeIcon size={19} /></span>
            <span><strong>{t('parent.magicSounds')}</strong><small>{t('parent.magicSoundsHint')}</small></span>
            <span className={`toggle ${soundEnabled ? 'is-on' : ''}`} aria-hidden="true"><i /></span>
          </button>
          <div className="setting-row setting-row--language">
            <span className="setting-row__icon"><GlobeIcon size={19} /></span>
            <span><strong>{t('parent.language')}</strong><small>{t('parent.languageHint')}</small></span>
            <div className="language-picker" role="group" aria-label={t('parent.language')}>
              <button type="button" className={locale === 'en' ? 'is-active' : ''} onClick={() => setLocale('en')} aria-pressed={locale === 'en'}>EN</button>
              <button type="button" className={locale === 'de' ? 'is-active' : ''} onClick={() => setLocale('de')} aria-pressed={locale === 'de'}>DE</button>
            </div>
          </div>
        </div>

        <div className="privacy-note"><ShieldIcon size={16} /><span>{t('parent.privacy')}</span></div>

        <div className="parent-panel__action">
          <button className="prime-button" type="button" onClick={onPrime}>
            <SparkleDot /> {t('parent.prime')} <span>→</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function SparkleDot() {
  return <span className="sparkle-dot" aria-hidden="true">✦</span>;
}
