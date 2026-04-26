import test from 'node:test';
import assert from 'node:assert/strict';

import { completionFromStatuses } from '../lib/progress.js';

test('completionFromStatuses returns 0 for empty status lists', () => {
  assert.equal(completionFromStatuses([]), 0);
});

test('completionFromStatuses computes weighted completion percentage', () => {
  const value = completionFromStatuses(['not_started', 'in_progress', 'blocked', 'done', 'shipped']);
  assert.equal(value, 57);
});
