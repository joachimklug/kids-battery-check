import test from 'node:test';
import assert from 'node:assert/strict';
import { shouldShowCameraFallback } from './camera.js';

test('the loading layer is removed as soon as the camera is ready', () => {
  assert.equal(shouldShowCameraFallback('requesting'), true);
  assert.equal(shouldShowCameraFallback('error'), true);
  assert.equal(shouldShowCameraFallback('ready'), false);
});
