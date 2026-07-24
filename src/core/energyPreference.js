import { ENERGY_LEVELS } from './energy.js';

const STORAGE_KEY = 'lumo:last-energy-level';

export const DEFAULT_ENERGY_LEVEL_ID = 'steady';

const isValidEnergyLevel = (levelId) => Object.hasOwn(ENERGY_LEVELS, levelId);

export const loadLastEnergyLevel = (storage) => {
  try {
    const availableStorage = storage === undefined ? globalThis.localStorage : storage;
    const storedLevel = availableStorage?.getItem(STORAGE_KEY);
    return isValidEnergyLevel(storedLevel) ? storedLevel : DEFAULT_ENERGY_LEVEL_ID;
  } catch {
    return DEFAULT_ENERGY_LEVEL_ID;
  }
};

export const saveLastEnergyLevel = (levelId, storage) => {
  if (!isValidEnergyLevel(levelId)) return false;

  try {
    const availableStorage = storage === undefined ? globalThis.localStorage : storage;
    availableStorage?.setItem(STORAGE_KEY, levelId);
    return Boolean(availableStorage);
  } catch {
    return false;
  }
};
