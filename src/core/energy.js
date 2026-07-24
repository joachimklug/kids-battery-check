export const ENERGY_LEVELS = Object.freeze({
  sleepy: Object.freeze({
    id: 'sleepy',
    value: 14,
    segments: 1,
    icon: 'moon',
    color: '#8d83f7',
    scene: '/assets/lumo-sleepy.webp',
  }),
  cozy: Object.freeze({
    id: 'cozy',
    value: 33,
    segments: 2,
    icon: 'heart',
    color: '#b578a5',
    scene: '/assets/lumo-cozy.jpg',
  }),
  steady: Object.freeze({
    id: 'steady',
    value: 52,
    segments: 3,
    icon: 'cloud',
    color: '#57c8c0',
    scene: '/assets/lumo-steady.webp',
  }),
  playful: Object.freeze({
    id: 'playful',
    value: 72,
    segments: 4,
    icon: 'sparkle',
    color: '#88b94a',
    scene: '/assets/lumo-playful.jpg',
  }),
  bright: Object.freeze({
    id: 'bright',
    value: 92,
    segments: 5,
    icon: 'sun',
    color: '#ffb94a',
    scene: '/assets/lumo-bright.webp',
  }),
});

export const getEnergyLevel = (levelId) => ENERGY_LEVELS[levelId] ?? ENERGY_LEVELS.steady;

export const getScanMessageKey = (progress) => {
  if (progress < 24) return 'scanner.message.waking';
  if (progress < 49) return 'scanner.message.finding';
  if (progress < 74) return 'scanner.message.counting';
  if (progress < 96) return 'scanner.message.reading';
  return 'scanner.message.found';
};
