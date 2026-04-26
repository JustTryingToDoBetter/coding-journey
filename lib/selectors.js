import { hasText, isCompleteStatus } from '../data/index.js';
import { isValidWeeklyTask } from './validation.js';

function normalizeTask(task) {
  if (isValidWeeklyTask(task)) return task;
  return {
    ...task,
    status: task.status || 'not_started',
    difficulty: task.difficulty || 'medium',
    linkedMilestone: task.linkedMilestone || `ms-${task.weekId}`,
  };
}

function filterTasks(tasks, filters, getTaskState, getEvidence) {
  return tasks
    .map(normalizeTask)
    .filter((task) => {
      const state = getTaskState(task.id);
      const evidence = getEvidence(task.id);
      if (filters.track !== 'all' && task.trackId !== filters.track) return false;
      if (filters.platform !== 'all' && task.platformId !== filters.platform) return false;
      if (filters.showIncomplete && isCompleteStatus(state.status)) return false;
      if (filters.showEvidenceOnly && !Object.values(evidence).some(Boolean)) return false;
      if (filters.showShippedOnly && state.status !== 'shipped') return false;
      if (hasText(filters.search)) {
        const haystack = `${task.title} ${task.conceptText}`.toLowerCase();
        if (!haystack.includes(filters.search.toLowerCase())) return false;
      }
      return true;
    });
}

export { filterTasks, normalizeTask };
