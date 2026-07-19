import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Brand } from './components/Brand.jsx';
import { NoFaceView } from './components/NoFaceView.jsx';
import { ParentPanel } from './components/ParentPanel.jsx';
import { ResultView } from './components/ResultView.jsx';
import { ScannerView } from './components/ScannerView.jsx';
import { WelcomeView } from './components/WelcomeView.jsx';
import { playMagicChime, playResultFanfare, playScanPulse } from './core/audio.js';
import { detectFace, createFaceDetector, isFaceDetectionSupported } from './core/faceDetection.js';
import { getEnergyLevel, getScanMessageKey } from './core/energy.js';
import { useI18n } from './i18n/I18nProvider.jsx';
import { recordScanEvent } from './lib/scanEvents.js';

const SCAN_DURATION_MS = 6200;
const RESULT_REVEAL_MS = 950;
const previewLevel = import.meta.env.DEV
  ? new URLSearchParams(window.location.search).get('preview')
  : null;
const validPreviewLevel = ['sleepy', 'steady', 'bright'].includes(previewLevel) ? previewLevel : null;
const isRevealPreview = previewLevel === 'reveal';

export default function App() {
  const { t } = useI18n();
  const [view, setView] = useState(validPreviewLevel ? 'result' : isRevealPreview ? 'scanner' : 'welcome');
  const [isParentPanelOpen, setParentPanelOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('sleepy');
  const [primedLevel, setPrimedLevel] = useState(validPreviewLevel || (isRevealPreview ? 'sleepy' : null));
  const [soundEnabled, setSoundEnabled] = useState(true);
  const faceCheckSupported = isFaceDetectionSupported();
  const [faceCheckEnabled, setFaceCheckEnabled] = useState(faceCheckSupported);
  const [cameraState, setCameraState] = useState(isRevealPreview ? 'ready' : 'idle');
  const [scanState, setScanState] = useState(isRevealPreview ? 'revealing' : 'framing');
  const [progress, setProgress] = useState(isRevealPreview ? 100 : 0);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const holdTimerRef = useRef(null);
  const cameraRequestRef = useRef(0);
  const scanRunRef = useRef(0);

  const stopCamera = useCallback(() => {
    cameraRequestRef.current += 1;
    scanRunRef.current += 1;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraState('idle');
  }, []);

  useEffect(() => () => {
    window.clearTimeout(holdTimerRef.current);
    cameraRequestRef.current += 1;
    scanRunRef.current += 1;
    streamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  const openCamera = useCallback(async () => {
    const requestId = cameraRequestRef.current + 1;
    cameraRequestRef.current = requestId;
    setCameraState('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 1280 } },
        audio: false,
      });
      if (requestId !== cameraRequestRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraState('ready');
        videoRef.current.play().catch(() => {
          // The muted playsInline video will retry automatically when its media is ready.
        });
        return;
      }
      stream.getTracks().forEach((track) => track.stop());
      setCameraState('error');
    } catch {
      if (requestId !== cameraRequestRef.current) return;
      setCameraState('error');
    }
  }, []);

  useEffect(() => {
    if (view === 'scanner' && cameraState === 'idle') openCamera();
  }, [cameraState, openCamera, view]);

  const startParentHold = () => {
    window.clearTimeout(holdTimerRef.current);
    holdTimerRef.current = window.setTimeout(() => {
      navigator.vibrate?.(35);
      setParentPanelOpen(true);
      playMagicChime(soundEnabled);
    }, 1100);
  };

  const endParentHold = () => window.clearTimeout(holdTimerRef.current);

  const primeMirror = () => {
    setPrimedLevel(selectedLevel);
    setParentPanelOpen(false);
    playMagicChime(soundEnabled);
  };

  const enterScanner = () => {
    if (!primedLevel) return;
    setScanState('framing');
    setProgress(0);
    setView('scanner');
  };

  const beginScan = async () => {
    if (scanState !== 'framing' || cameraState !== 'ready') return;
    setScanState('scanning');
    setProgress(0);
    const scanRunId = scanRunRef.current + 1;
    scanRunRef.current = scanRunId;
    playScanPulse(soundEnabled);
    const detector = faceCheckEnabled ? createFaceDetector() : null;
    let faceSeen = !faceCheckEnabled;
    const startedAt = performance.now();
    let lastDetectionAt = 0;
    let lastPulseAt = 0;

    const tick = async (now) => {
      if (scanRunId !== scanRunRef.current) return;
      const elapsed = now - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / SCAN_DURATION_MS) * 100));
      setProgress(nextProgress);

      if (detector && now - lastDetectionAt > 650) {
        lastDetectionAt = now;
        faceSeen = faceSeen || await detectFace(detector, videoRef.current);
      }
      if (now - lastPulseAt > 1450 && nextProgress < 92) {
        lastPulseAt = now;
        playScanPulse(soundEnabled);
      }

      if (elapsed < SCAN_DURATION_MS) {
        window.requestAnimationFrame(tick);
        return;
      }

      if (!faceSeen) {
        stopCamera();
        setView('no-face');
        recordScanEvent({ outcome: 'no_face', faceCheckUsed: true });
        return;
      }

      setProgress(100);
      setScanState('revealing');
      playResultFanfare(primedLevel, soundEnabled);
      navigator.vibrate?.([35, 35, 70]);
      window.setTimeout(() => {
        if (scanRunId !== scanRunRef.current) return;
        stopCamera();
        setView('result');
        recordScanEvent({ outcome: primedLevel, faceCheckUsed: faceCheckEnabled });
      }, RESULT_REVEAL_MS);
    };
    window.requestAnimationFrame(tick);
  };

  const returnHome = () => {
    stopCamera();
    setPrimedLevel(null);
    setProgress(0);
    setScanState('framing');
    setView('welcome');
  };

  const retryScan = () => {
    setProgress(0);
    setScanState('framing');
    setView('scanner');
  };

  const showBrand = view === 'welcome';

  return (
    <div className={`app app--${view}`}>
      {showBrand && (
        <Brand
          onParentHoldStart={startParentHold}
          onParentHoldEnd={endParentHold}
          onParentOpen={() => setParentPanelOpen(true)}
          onSoundToggle={() => setSoundEnabled((enabled) => !enabled)}
          soundEnabled={soundEnabled}
        />
      )}

      {view === 'welcome' && <WelcomeView isPrimed={Boolean(primedLevel)} onStart={enterScanner} onParentHoldStart={startParentHold} onParentHoldEnd={endParentHold} onParentOpen={() => setParentPanelOpen(true)} />}
      {view === 'scanner' && (
        <ScannerView
          videoRef={videoRef}
          cameraState={cameraState}
          scanState={scanState}
          progress={progress}
          scanMessage={t(getScanMessageKey(progress))}
          onBeginScan={beginScan}
          onCancel={returnHome}
          onRetryCamera={openCamera}
        />
      )}
      {view === 'result' && (
        <ResultView
          result={getEnergyLevel(primedLevel)}
          onReplay={() => playResultFanfare(primedLevel, soundEnabled)}
          onFinish={returnHome}
        />
      )}
      {view === 'no-face' && <NoFaceView onRetry={retryScan} onCancel={returnHome} />}

      {isParentPanelOpen && (
        <ParentPanel
          selectedLevel={selectedLevel}
          onSelectLevel={setSelectedLevel}
          soundEnabled={soundEnabled}
          onSoundToggle={() => setSoundEnabled((enabled) => !enabled)}
          faceCheckEnabled={faceCheckEnabled}
          faceCheckSupported={faceCheckSupported}
          onFaceCheckToggle={() => faceCheckSupported && setFaceCheckEnabled((enabled) => !enabled)}
          onClose={() => setParentPanelOpen(false)}
          onPrime={primeMirror}
        />
      )}
    </div>
  );
}
