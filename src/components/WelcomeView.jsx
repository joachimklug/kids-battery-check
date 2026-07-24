import React from 'react';
import { MoonIcon, SparklesIcon } from './Icons.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

export function WelcomeView({ onStart, onParentHoldStart, onParentHoldEnd, onParentOpen }) {
  const { t } = useI18n();
  return (
    <main className="welcome page-enter">
      <div className="ambient-stars" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>
      <section className="welcome__copy">
        <div className="eyebrow"><SparklesIcon size={17} /> {t('welcome.eyebrow')}</div>
        <h1>{t('welcome.titleLine')}<br /><em>{t('welcome.titleHighlight')}</em></h1>
        <p>{t('welcome.description')}</p>
      </section>

      <section className="mirror-card mirror-card--ready" aria-label={t('welcome.mirrorReady')}>
        <div className="mirror-card__halo" aria-hidden="true" />
        <div className="mirror-card__orbit mirror-card__orbit--one" aria-hidden="true">✦</div>
        <div className="mirror-card__orbit mirror-card__orbit--two" aria-hidden="true">●</div>
        <div className="mirror-card__glass">
          <div className="mirror-card__shine" />
          <img className="lumo lumo--welcome" src="/assets/lumo.png" alt={t('welcome.lumoAlt')} />
        </div>
      </section>

      <section className="welcome__action">
        <button className="primary-button" type="button" onClick={onStart}>
          <span className="primary-button__icon"><SparklesIcon size={22} /></span>
          <span className="primary-button__label">{t('welcome.wake')}</span>
        </button>
        <button
          className="parent-guide"
          type="button"
          onPointerDown={onParentHoldStart}
          onPointerUp={onParentHoldEnd}
          onPointerCancel={onParentHoldEnd}
          onPointerLeave={onParentHoldEnd}
          onLostPointerCapture={onParentHoldEnd}
          onBlur={onParentHoldEnd}
          onContextMenu={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
          draggable={false}
          onClick={(event) => event.detail === 0 && onParentOpen()}
          onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && onParentOpen()}
          aria-label={`${t('welcome.parentGuideTitle')}. ${t('welcome.parentGuideAction')}`}
        >
          <span className="parent-guide__moon"><MoonIcon size={20} /></span>
          <span className="parent-guide__copy">
            <small>{t('welcome.parentGuideTitle')}</small>
            <strong>{t('welcome.parentGuideAction')}</strong>
          </span>
          <span className="parent-guide__arrow" aria-hidden="true">›</span>
        </button>
      </section>
    </main>
  );
}
