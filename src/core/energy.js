export const ENERGY_LEVELS = Object.freeze({
  sleepy: Object.freeze({
    id: 'sleepy',
    value: 18,
    segments: 1,
    icon: 'moon',
    color: '#8d83f7',
    scene: '/assets/lumo-sleepy.webp',
  }),
  steady: Object.freeze({
    id: 'steady',
    value: 52,
    segments: 2,
    icon: 'cloud',
    color: '#57c8c0',
    scene: '/assets/lumo-steady.webp',
  }),
  bright: Object.freeze({
    id: 'bright',
    value: 91,
    segments: 3,
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
