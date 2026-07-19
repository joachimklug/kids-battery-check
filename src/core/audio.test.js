import test from 'node:test';
import assert from 'node:assert/strict';
import { createAudioEngine } from './audio.js';

class FakeAudioParam {
  setValueAtTime() {}
  linearRampToValueAtTime() {}
  exponentialRampToValueAtTime() {}
}

class FakeAudioNode {
  connect() { return this; }
}

class FakeOscillator extends FakeAudioNode {
  frequency = new FakeAudioParam();
  start() {}
  stop() {}
}

class FakeGain extends FakeAudioNode {
  gain = new FakeAudioParam();
}

test('audio engine reuses an unlocked context for delayed sounds', () => {
  let constructorCalls = 0;
  let resumeCalls = 0;

  class FakeAudioContext {
    state = 'suspended';
    currentTime = 1;
    destination = {};

    constructor() { constructorCalls += 1; }
    createOscillator() { return new FakeOscillator(); }
    createGain() { return new FakeGain(); }
    resume() {
      resumeCalls += 1;
      this.state = 'running';
      return Promise.resolve();
    }
  }

  const engine = createAudioEngine(() => FakeAudioContext);

  assert.equal(engine.unlock(), true);
  assert.equal(engine.playMagicChime(), true);
  assert.equal(engine.playScanPulse(), true);
  assert.equal(engine.playResultFanfare('bright'), true);
  assert.equal(constructorCalls, 1);
  assert.equal(resumeCalls, 1);
});

test('disabled or unsupported audio fails silently', () => {
  let constructorCalls = 0;
  class FakeAudioContext {
    constructor() { constructorCalls += 1; }
  }

  const disabledEngine = createAudioEngine(() => FakeAudioContext);
  assert.equal(disabledEngine.playMagicChime(false), false);
  assert.equal(constructorCalls, 0);

  const unsupportedEngine = createAudioEngine(() => null);
  assert.equal(unsupportedEngine.unlock(), false);
  assert.equal(unsupportedEngine.playScanPulse(), false);
});
