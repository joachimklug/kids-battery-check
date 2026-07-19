import React from 'react';
import { CameraIcon, RefreshIcon } from './Icons.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

export function NoFaceView({ onRetry, onCancel }) {
  const { t } = useI18n();
  return (
    <main className="no-face page-enter">
      <div className="no-face__stars" aria-hidden="true">✦ · ✧</div>
      <img src="/assets/lumo.png" alt={t('noFace.lumoAlt')} />
      <span className="no-face__icon"><CameraIcon size={28} /></span>
      <p className="eyebrow">{t('noFace.eyebrow')}</p>
      <h1>{t('noFace.titleLine1')}<br />{t('noFace.titleLine2')}</h1>
      <p className="no-face__copy">{t('noFace.body')}</p>
      <button className="primary-button" type="button" onClick={onRetry}><RefreshIcon /> {t('noFace.retry')}</button>
      <button className="text-button" type="button" onClick={onCancel}>{t('noFace.later')}</button>
    </main>
  );
}
