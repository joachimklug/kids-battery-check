import test from 'node:test';
import assert from 'node:assert/strict';
import { ENERGY_LEVELS, getEnergyLevel, getScanMessageKey } from './energy.js';

test('energy presets expose a safe ascending scale', () => {
  const values = Object.values(ENERGY_LEVELS).map(({ value }) => value);
  const segments = Object.values(ENERGY_LEVELS).map(({ segments }) => segments);

  assert.deepEqual(values, [18, 52, 91]);
  assert.deepEqual(segments, [1, 2, 3]);
  assert.ok(values.every((value) => value >= 0 && value <= 100));
});

test('unknown energy levels fail safely to the gentle preset', () => {
  assert.equal(getEnergyLevel('unknown').id, 'steady');
  assert.equal(getEnergyLevel(undefined).id, 'steady');
});

test('scan messages advance across all progress boundaries', () => {
  assert.equal(getScanMessageKey(0), 'scanner.message.waking');
  assert.equal(getScanMessageKey(24), 'scanner.message.finding');
  assert.equal(getScanMessageKey(49), 'scanner.message.counting');
  assert.equal(getScanMessageKey(74), 'scanner.message.reading');
  assert.equal(getScanMessageKey(96), 'scanner.message.found');
});
