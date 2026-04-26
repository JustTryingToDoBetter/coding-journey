import test from 'node:test';
import assert from 'node:assert/strict';

import { hasValidDifficulty, hasValidId, hasValidStatus, isValidWeeklyTask } from '../lib/validation.js';

test('validation helpers accept valid primitive values', () => {
  assert.equal(hasValidId('task-1'), true);
  assert.equal(hasValidStatus('in_progress'), true);
  assert.equal(hasValidDifficulty('medium'), true);
});

test('isValidWeeklyTask rejects invalid and accepts valid tasks', () => {
  assert.equal(isValidWeeklyTask(null), false);
  assert.equal(
    isValidWeeklyTask({ id: 'x', status: 'not_a_status', difficulty: 'medium', linkedMilestone: 'ms-1' }),
    false
  );
  assert.equal(
    isValidWeeklyTask({ id: 'wk-1-task-1', weekId: 'wk-1', status: 'not_started', difficulty: 'easy', linkedMilestone: 'ms-1' }),
    true
  );
});
