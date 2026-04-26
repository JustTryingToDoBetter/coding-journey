import { hasEvidence, hasText, isCompleteStatus } from '../data/index.js';

function applyTaskFilters(tasks, filters, getTaskState, getEvidence) {
  return tasks.filter((task) => {
    const state = getTaskState(task.id);
    const evidence = getEvidence(task.id);
    if (filters.track !== 'all' && task.trackId !== filters.track) return false;
    if (filters.platform !== 'all' && task.platformId !== filters.platform) return false;
    if (filters.showIncomplete && isCompleteStatus(state.status)) return false;
    if (filters.showEvidenceOnly && !hasEvidence(evidence)) return false;
    if (filters.showShippedOnly && state.status !== 'shipped') return false;
    if (hasText(filters.search)) {
      const haystack = `${task.title} ${task.conceptText}`.toLowerCase();
      if (!haystack.includes(filters.search.toLowerCase())) return false;
    }
    return true;
  });
}

function getVisibleWeeksForPhase(weeks, phase, filters, getTaskState, getEvidence) {
  return weeks
    .filter((week) => week.phaseNumber === phase)
    .map((week) => ({ ...week, visibleTasks: applyTaskFilters(week.tasks, filters, getTaskState, getEvidence) }))
    .filter((week) => week.visibleTasks.length > 0);
}

export { applyTaskFilters, getVisibleWeeksForPhase };
