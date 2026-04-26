import { filterTasks } from './selectors.js';

function applyTaskFilters(tasks, filters, getTaskState, getEvidence) {
  return filterTasks(tasks, filters, getTaskState, getEvidence);
}

function getVisibleMilestonesForPhase(milestones, weeks, phase, filters, getTaskState, getEvidence) {
  const weeksById = Object.fromEntries(weeks.map((week) => [week.id, week]));
  return milestones
    .filter((milestone) => milestone.phaseNumber === phase)
    .map((milestone) => {
      const week = weeksById[milestone.weekId];
      const visibleTasks = filterTasks(week.tasks, filters, getTaskState, getEvidence);
      return { ...milestone, week, visibleTasks };
    })
    .filter((milestone) => milestone.visibleTasks.length > 0);
}

export { applyTaskFilters, getVisibleMilestonesForPhase };
