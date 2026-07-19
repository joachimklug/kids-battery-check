import test from 'node:test';
import assert from 'node:assert/strict';
import { isPrimaryHoldPointer } from './parentHold.js';

test('parent hold accepts primary touch, pen, and mouse input', () => {
  assert.equal(isPrimaryHoldPointer(), true);
  assert.equal(isPrimaryHoldPointer({ isPrimary: true, button: 0 }), true);
});

test('parent hold ignores multi-touch and secondary mouse buttons', () => {
  assert.equal(isPrimaryHoldPointer({ isPrimary: false, button: 0 }), false);
  assert.equal(isPrimaryHoldPointer({ isPrimary: true, button: 1 }), false);
  assert.equal(isPrimaryHoldPointer({ isPrimary: true, button: 2 }), false);
});
