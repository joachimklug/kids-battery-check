import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_ENERGY_LEVEL_ID, loadLastEnergyLevel, saveLastEnergyLevel } from './energyPreference.js';

const createStorage = (initialValue = null) => {
  let value = initialValue;
  return {
    getItem: () => value,
    setItem: (_key, nextValue) => {
      value = nextValue;
    },
  };
};

test('the first visit defaults to the middle energy level', () => {
  assert.equal(loadLastEnergyLevel(createStorage()), DEFAULT_ENERGY_LEVEL_ID);
  assert.equal(DEFAULT_ENERGY_LEVEL_ID, 'steady');
});

test('a valid previous result becomes the next default', () => {
  const storage = createStorage();

  assert.equal(saveLastEnergyLevel('playful', storage), true);
  assert.equal(loadLastEnergyLevel(storage), 'playful');
});

test('invalid or unavailable stored values fail safely to the middle level', () => {
  assert.equal(loadLastEnergyLevel(createStorage('unexpected')), 'steady');
  assert.equal(saveLastEnergyLevel('unexpected', createStorage()), false);
  assert.equal(loadLastEnergyLevel({ getItem: () => { throw new Error('blocked'); } }), 'steady');
});
