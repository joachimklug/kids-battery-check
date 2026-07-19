import test from 'node:test';
import assert from 'node:assert/strict';
import { createFaceDetector, detectFace, isFaceDetectionSupported } from './faceDetection.js';

test('face checking reports unavailable when the browser API is missing', () => {
  delete globalThis.window;

  assert.equal(isFaceDetectionSupported(), false);
  assert.equal(createFaceDetector(), null);
});

test('a browser constructor failure falls back safely', () => {
  globalThis.window = { FaceDetector: class { constructor() { throw new Error('unsupported'); } } };

  assert.equal(isFaceDetectionSupported(), true);
  assert.equal(createFaceDetector(), null);
  delete globalThis.window;
});

test('face detection treats detector errors and unready video as no face', async () => {
  const failingDetector = { detect: async () => { throw new Error('frame unavailable'); } };

  assert.equal(await detectFace(failingDetector, { readyState: 1 }), false);
  assert.equal(await detectFace(failingDetector, { readyState: 4 }), false);
});
