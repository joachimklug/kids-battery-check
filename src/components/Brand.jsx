import React from 'react';
import { MoonIcon, VolumeIcon, VolumeOffIcon } from './Icons.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

export function Brand({ onParentHoldStart, onParentHoldEnd, onParentOpen, onSoundToggle, soundEnabled, compact = false }) {
  const { t } = useI18n();
  return (
    <header className={`brand ${compact ? 'brand--compact' : ''}`}>
      <div className="brand__mark" aria-hidden="true"><span>✦</span></div>
      <div className="brand__words">
        <span className="brand__name">Lumo</span>
        <span className="brand__tagline">{t('brand.tagline')}</span>
      </div>
      <div className="brand__actions">
        <button className="icon-button" type="button" onClick={onSoundToggle} aria-label={soundEnabled ? t('brand.soundOff') : t('brand.soundOn')}>
          {soundEnabled ? <VolumeIcon size={20} /> : <VolumeOffIcon size={20} />}
        </button>
        <button
          className="icon-button parent-moon"
          type="button"
          onPointerDown={onParentHoldStart}
          onPointerUp={onParentHoldEnd}
          onPointerCancel={onParentHoldEnd}
          onPointerLeave={onParentHoldEnd}
          onClick={(event) => event.detail === 0 && onParentOpen()}
          onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && onParentOpen()}
          aria-label={t('parent.open')}
        >
          <MoonIcon size={20} />
          <span className="parent-moon__progress" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
