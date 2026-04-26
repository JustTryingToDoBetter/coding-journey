import { filterTasks } from './selectors.js';

function applyTaskFilters(tasks, filters, getTaskState, getEvidence) {
  return filterTasks(tasks, filters, getTaskState, getEvidence);
}

function getVisibleWeeksForPhase(weeks, phase, filters, getTaskState, getEvidence) {
  return weeks
    .filter((week) => week.phaseNumber === phase)
    .map((week) => ({ ...week, visibleTasks: filterTasks(week.tasks, filters, getTaskState, getEvidence) }))
    .filter((week) => week.visibleTasks.length > 0);
}

export { applyTaskFilters, getVisibleWeeksForPhase };
