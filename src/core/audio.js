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

const withAudioContext = (callback) => {
  const AudioContext = window.AudioContext ?? window.webkitAudioContext;
  if (!AudioContext) return;
  const audioContext = new AudioContext();
  callback(audioContext, audioContext.currentTime);
  window.setTimeout(() => audioContext.close(), 2200);
};

export const playMagicChime = (enabled = true) => {
  if (!enabled) return;
  withAudioContext((context, now) => {
    playTone(context, 523.25, now, 0.45);
    playTone(context, 659.25, now + 0.16, 0.5);
    playTone(context, 783.99, now + 0.32, 0.65);
  });
};

export const playScanPulse = (enabled = true) => {
  if (!enabled) return;
  withAudioContext((context, now) => {
    playTone(context, 392, now, 0.25, 0.035);
    playTone(context, 523.25, now + 0.12, 0.3, 0.03);
  });
};

export const playResultFanfare = (levelId, enabled = true) => {
  if (!enabled) return;
  const notes = levelId === 'sleepy' ? [392, 349.23, 293.66] : levelId === 'bright' ? [523.25, 659.25, 783.99, 1046.5] : [440, 523.25, 659.25];
  withAudioContext((context, now) => {
    notes.forEach((note, index) => playTone(context, note, now + index * 0.18, 0.55, 0.055));
  });
};
