const playTone = (audioContext, frequency, start, duration, volume = 0.08) => {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
};

const getBrowserAudioContext = () => {
  if (typeof window === 'undefined') return null;
  return window.AudioContext ?? window.webkitAudioContext ?? null;
};

export const createAudioEngine = (getAudioContextConstructor = getBrowserAudioContext) => {
  let audioContext = null;

  const getAudioContext = () => {
    const AudioContext = getAudioContextConstructor();
    if (!AudioContext) return null;
    if (!audioContext || audioContext.state === 'closed') audioContext = new AudioContext();
    return audioContext;
  };

  const resumeAudio = (context) => {
    if (context.state === 'running' || context.state === 'closed') return;
    context.resume()?.catch(() => {
      // A later user interaction gets another chance to unlock sound.
    });
  };

  const unlock = () => {
    const context = getAudioContext();
    if (!context) return false;
    resumeAudio(context);

    // Starting an inaudible oscillator inside the gesture also unlocks older iOS versions.
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0, context.currentTime);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.01);
    return true;
  };

  const withAudioContext = (callback) => {
    const context = getAudioContext();
    if (!context) return false;
    resumeAudio(context);
    callback(context, context.currentTime);
    return true;
  };

  const playMagicChime = (enabled = true) => {
    if (!enabled) return false;
    return withAudioContext((context, now) => {
      playTone(context, 523.25, now, 0.45);
      playTone(context, 659.25, now + 0.16, 0.5);
      playTone(context, 783.99, now + 0.32, 0.65);
    });
  };

  const playScanPulse = (enabled = true) => {
    if (!enabled) return false;
    return withAudioContext((context, now) => {
      playTone(context, 392, now, 0.25, 0.035);
      playTone(context, 523.25, now + 0.12, 0.3, 0.03);
    });
  };

  const playResultFanfare = (levelId, enabled = true) => {
    if (!enabled) return false;
    const notes = levelId === 'sleepy'
      ? [392, 349.23, 293.66]
      : levelId === 'bright'
        ? [523.25, 659.25, 783.99, 1046.5]
        : [440, 523.25, 659.25];
    return withAudioContext((context, now) => {
      notes.forEach((note, index) => playTone(context, note, now + index * 0.18, 0.55, 0.055));
    });
  };

  return { unlock, playMagicChime, playScanPulse, playResultFanfare };
};

const audioEngine = createAudioEngine();

export const unlockAudio = () => audioEngine.unlock();
export const playMagicChime = (enabled) => audioEngine.playMagicChime(enabled);
export const playScanPulse = (enabled) => audioEngine.playScanPulse(enabled);
export const playResultFanfare = (levelId, enabled) => audioEngine.playResultFanfare(levelId, enabled);
