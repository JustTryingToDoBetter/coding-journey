import { DIFFICULTIES, TASK_STATUSES, type Difficulty, type TaskStatus, type WeeklyTask } from '../types/roadmap';

const statusSet = new Set<TaskStatus>(TASK_STATUSES);
const difficultySet = new Set<Difficulty>(DIFFICULTIES);

function hasValidId(id: unknown): id is string {
  return typeof id === 'string' && id.trim().length > 0;
}

function hasValidStatus(status: unknown): status is TaskStatus {
  return typeof status === 'string' && statusSet.has(status as TaskStatus);
}

function hasValidDifficulty(difficulty: unknown): difficulty is Difficulty {
  return typeof difficulty === 'string' && difficultySet.has(difficulty as Difficulty);
}

function hasLinkedMilestone(linkedMilestone: unknown): linkedMilestone is string {
  return typeof linkedMilestone === 'string' && linkedMilestone.startsWith('ms-');
}

function isValidWeeklyTask(task: unknown): task is WeeklyTask {
  if (!task || typeof task !== 'object') return false;
  const candidate = task as Partial<WeeklyTask>;
  return (
    hasValidId(candidate.id) &&
    hasValidStatus(candidate.status) &&
    hasValidDifficulty(candidate.difficulty) &&
    hasLinkedMilestone(candidate.linkedMilestone)
  );
}

export { hasLinkedMilestone, hasValidDifficulty, hasValidId, hasValidStatus, isValidWeeklyTask };
