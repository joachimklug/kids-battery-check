import React from 'react';
import { CameraIcon, CloseIcon, ShieldIcon, SparklesIcon } from './Icons.jsx';
import { shouldShowCameraFallback } from '../core/camera.js';
import { useI18n } from '../i18n/I18nProvider.jsx';

export function ScannerView({ videoRef, cameraState, scanState, progress, scanMessage, onBeginScan, onCancel, onRetryCamera }) {
  const { t } = useI18n();
  const isScanning = scanState === 'scanning';
  const isRevealing = scanState === 'revealing';
  return (
    <main className="scanner page-enter">
      <div className="camera-stage">
        <video
          ref={videoRef}
          className={`camera-feed ${cameraState === 'ready' ? 'is-visible' : ''}`}
          autoPlay
          muted
          playsInline
          onCanPlay={(event) => event.currentTarget.play().catch(() => {})}
          aria-label={t('scanner.videoAlt')}
        />
        {shouldShowCameraFallback(cameraState) && (
          <div className="camera-fallback">
            <div className="camera-fallback__glow" />
            {cameraState === 'requesting' && <><span className="loader-orb" /><p>{t('scanner.opening')}</p></>}
            {cameraState === 'error' && (
              <div className="camera-error">
                <span className="camera-error__icon"><CameraIcon size={28} /></span>
                <h2>{t('scanner.cameraErrorTitle')}</h2>
                <p>{t('scanner.cameraErrorBody')}</p>
                <button type="button" onClick={onRetryCamera}>{t('scanner.retryCamera')}</button>
              </div>
            )}
          </div>
        )}

        <div className={`scan-vignette ${isScanning ? 'is-scanning' : ''} ${isRevealing ? 'is-revealing' : ''}`} aria-hidden="true" />
        <div className={`face-frame ${isScanning ? 'is-scanning' : ''} ${isRevealing ? 'is-revealing' : ''}`} aria-hidden="true">
          <i className="corner corner--tl" /><i className="corner corner--tr" /><i className="corner corner--bl" /><i className="corner corner--br" />
          <div className="face-cue"><i /><i /><span /></div>
          <div className="scan-line" />
        </div>
        <div className="scanner-sparkles" aria-hidden="true"><i>✦</i><i>·</i><i>✧</i><i>✦</i></div>
        {!isRevealing && (
          <img className={`scanner-lumo ${isScanning ? 'is-scanning' : ''}`} src="/assets/lumo.png" alt="" aria-hidden="true" />
        )}
        {isRevealing && (
          <div className="scan-reveal" aria-hidden="true">
            <span className="scan-reveal__ring" />
            <span className="scan-reveal__ring scan-reveal__ring--outer" />
            <span className="scan-reveal__burst">✦</span>
            <img src="/assets/lumo.png" alt="" />
            <i>✦</i><i>✦</i><i>✦</i><i>✦</i>
          </div>
        )}

        <header className="scanner__topbar">
          <span className="scanner__status"><i /> {t('scanner.status')}</span>
          <button className="icon-button icon-button--glass" type="button" onClick={onCancel} aria-label={t('scanner.close')}><CloseIcon size={21} /></button>
        </header>

        <section className="scanner__guide" aria-live="polite">
          {isRevealing ? (
            <div className="scanner__found">
              <p className="scanner__kicker"><SparklesIcon size={16} /> {t('scanner.status')}</p>
              <h1>{t('scanner.message.found')}</h1>
            </div>
          ) : isScanning ? (
            <>
              <div className="scan-progress" aria-label={t('scanner.progress', { progress })}><span style={{ '--progress': `${progress}%` }} /></div>
              <p className="scanner__kicker"><SparklesIcon size={16} /> {t('scanner.scanning')}</p>
              <h1>{scanMessage}</h1>
              <p>{t('scanner.holdStill')}</p>
            </>
          ) : cameraState === 'ready' ? (
            <>
              <p className="scanner__kicker"><CameraIcon size={16} /> {t('scanner.ready')}</p>
              <h1>{t('scanner.faceLine1')}<br />{t('scanner.faceLine2')}</h1>
              <p>{t('scanner.lookAtLumo')}</p>
              <button className="scan-button" type="button" onClick={onBeginScan}>
                <span><SparklesIcon size={25} /></span> {t('scanner.start')}
              </button>
            </>
          ) : null}
        </section>

        {!isRevealing && <div className="scanner__privacy"><ShieldIcon size={14} /> {t('scanner.privacy')}</div>}
      </div>
    </main>
  );
}
