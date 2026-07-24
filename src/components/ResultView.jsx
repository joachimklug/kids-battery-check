import React from 'react';
import { CheckIcon, SparklesIcon } from './Icons.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

const actionIcons = { sleepy: '☾', cozy: '♥', steady: '▤', playful: '↗', bright: '♪' };
const ENERGY_SEGMENTS = [1, 2, 3, 4, 5];

export function ResultView({ result, onScanAgain }) {
  const { t } = useI18n();
  const translationKey = `energy.${result.id}`;

  return (
    <main className={`story-result story-result--${result.id} page-enter`}>
      <header className="story-result__brand"><span>✦</span> {t('result.brand')}</header>

      <div className="story-scene">
        <span className="story-scene__motion">
          <img className="story-scene__image" src={result.scene} alt={t(`${translationKey}.visualAlt`)} />
          <span className="story-scene__shade" aria-hidden="true" />
          <span className="story-effects" aria-hidden="true">
            <i /><i /><i /><i /><i /><i />
          </span>
          <span className="story-scene__caption">
            <span><SparklesIcon size={15} /> {t(`${translationKey}.eyebrow`)}</span>
            <strong>{t(`${translationKey}.title`)}</strong>
          </span>
        </span>
      </div>

      <section className="story-reading">
        <div className="story-energy">
          <div className="story-energy__label">
            <span>{t('result.energy')}</span>
            <strong>{t(`${translationKey}.label`)}</strong>
          </div>
          <div className="story-energy__stars" role="img" aria-label={t('result.energyStars', { count: result.segments })}>
            {ENERGY_SEGMENTS.map((segment) => (
              <span className={segment <= result.segments ? 'is-filled' : ''} key={segment}>✦</span>
            ))}
          </div>
        </div>

        <div className="read-aloud">
          <span className="read-aloud__label">{t('result.readTogether')}</span>
          <p>{t(`${translationKey}.message`)}</p>
        </div>

        <div className="story-action">
          <span className="story-action__icon" aria-hidden="true">{actionIcons[result.id]}</span>
          <div><small>{t('result.needs')}</small><strong>{t(`${translationKey}.action`)}</strong></div>
        </div>
      </section>

      <button className="story-done" type="button" onClick={onScanAgain}><CheckIcon size={19} /> {t('result.scanAgain')}</button>
    </main>
  );
}
