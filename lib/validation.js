const TASK_STATUSES = ['not_started', 'in_progress', 'blocked', 'completed', 'shipped'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];

const statusSet = new Set(TASK_STATUSES);
const difficultySet = new Set(DIFFICULTIES);

function hasValidId(id) {
  return typeof id === 'string' && id.trim().length > 0;
}

function hasValidStatus(status) {
  return typeof status === 'string' && statusSet.has(status);
}

function hasValidDifficulty(difficulty) {
  return typeof difficulty === 'string' && difficultySet.has(difficulty);
}

function hasLinkedMilestone(linkedMilestone) {
  return typeof linkedMilestone === 'string' && linkedMilestone.startsWith('ms-');
}

function isValidWeeklyTask(task) {
  if (!task || typeof task !== 'object') return false;
  return (
    hasValidId(task.id) &&
    hasValidStatus(task.status ?? 'not_started') &&
    hasValidDifficulty(task.difficulty ?? 'medium') &&
    hasLinkedMilestone(task.linkedMilestone ?? `ms-${task.weekId || ''}`)
  );
}

export { hasLinkedMilestone, hasValidDifficulty, hasValidId, hasValidStatus, isValidWeeklyTask };
