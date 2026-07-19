import React from 'react';
import { LockIcon, SparklesIcon } from './Icons.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

export function WelcomeView({ isPrimed, onStart, onParentHoldStart, onParentHoldEnd, onParentOpen }) {
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

      <section className={`mirror-card ${isPrimed ? 'mirror-card--ready' : ''}`} aria-label={isPrimed ? t('welcome.mirrorReady') : t('welcome.mirrorWaiting')}>
        <div className="mirror-card__halo" aria-hidden="true" />
        <div className="mirror-card__orbit mirror-card__orbit--one" aria-hidden="true">✦</div>
        <div className="mirror-card__orbit mirror-card__orbit--two" aria-hidden="true">●</div>
        <div className="mirror-card__glass">
          <div className="mirror-card__shine" />
          <img className="lumo lumo--welcome" src="/assets/lumo.png" alt={t('welcome.lumoAlt')} />
        </div>
      </section>

      <section className="welcome__action">
        <button className={`primary-button ${!isPrimed ? 'primary-button--locked' : ''}`} type="button" onClick={onStart} disabled={!isPrimed}>
          <span className="primary-button__icon">{isPrimed ? <SparklesIcon size={22} /> : <LockIcon size={21} />}</span>
          <span className="primary-button__label">{isPrimed ? t('welcome.wake') : t('welcome.waiting')}</span>
        </button>
        {!isPrimed && (
          <button
            className="parent-hint"
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
          >
            <span className="parent-hint__moon"><span>☾</span></span>
            <span><strong>{t('welcome.grownups')}</strong> · {t('welcome.holdMoon')}</span>
          </button>
        )}
      </section>
    </main>
  );
}
