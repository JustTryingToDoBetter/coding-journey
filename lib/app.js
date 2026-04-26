import { ROADMAP_DATA } from '../data/index.js';
import { renderHeader } from '../components/header.js';
import { renderNav } from '../components/nav.js';
import { getVisibleMilestonesForPhase } from './filters.js';
import { getBoardMetrics, getCurrentFocus, getDashboardMetrics, getMilestoneStats } from './metrics.js';
import { getEvidence, getTaskBoardColumn, getTaskState, loadStore, moveBoardTask, resetBoardDemoData, saveStore, setTaskStatus } from './persistence.js';
import { renderMain } from './viewRenderer.js';

let phase = 1;
const store = loadStore();

function localGetTaskState(taskId) {
  return getTaskState(store, taskId);
}
function localGetEvidence(taskId) {
  return getEvidence(store, taskId);
}

function render() {
  const milestoneByWeekId = ROADMAP_DATA.milestones.reduce((acc, milestone) => {
    acc[milestone.week.id] = milestone;
    return acc;
  }, {});
  const boardTasks = ROADMAP_DATA.tasks
    .filter((task) => store.board?.tasksById?.[task.id])
    .map((task) => ({
      ...task,
      column: getTaskBoardColumn(store, task.id),
      milestoneTitle: milestoneByWeekId[task.weekId]?.title || 'Unlinked milestone',
    }));
  const boardMetrics = getBoardMetrics(boardTasks);

  document.getElementById('header-root').innerHTML = renderHeader();
  document.getElementById('nav-root').innerHTML = renderNav(ROADMAP_DATA.phases, phase);

  document.getElementById('main').innerHTML = renderMain({
    phase,
    filters: store.settings.filters,
    getVisibleMilestonesForPhase: (milestones, weeks, p, filters, getState) =>
      getVisibleMilestonesForPhase(milestones, weeks, p, filters, getState, localGetEvidence),
    getMilestoneStats: (milestone) => getMilestoneStats(milestone, localGetTaskState, localGetEvidence),
    getCurrentFocus,
    getTaskState: localGetTaskState,
    getDashboardMetrics: (tasks, weeks, getState) => getDashboardMetrics(tasks, weeks, getState, localGetEvidence),
    boardTasks,
    boardMetrics,
  });
}

document.addEventListener('click', (event) => {
  const phaseButton = event.target.closest('[data-phase]');
  if (phaseButton) {
    phase = Number(phaseButton.dataset.phase);
    render();
  }
});

document.addEventListener('change', (event) => {
  const target = event.target;
  if (target.matches('.board-move-select')) {
    moveBoardTask(store, target.dataset.boardTaskId, target.value);
    saveStore(store);
    render();
    return;
  }
  if (target.matches('.status-select')) {
    setTaskStatus(store, target.dataset.taskId, target.value);
    saveStore(store);
    render();
    return;
  }
  if (target.matches('[data-filter]')) {
    store.settings.filters[target.dataset.filter] = target.value;
    saveStore(store);
    render();
  }
});

document.addEventListener('input', (event) => {
  const target = event.target;
  if (target.matches('[data-filter="search"]')) {
    store.settings.filters.search = target.value;
    saveStore(store);
    render();
  }
});

document.addEventListener('click', (event) => {
  const resetButton = event.target.closest('[data-action="reset-board"]');
  if (resetButton) {
    resetBoardDemoData(store);
    saveStore(store);
    render();
  }
});

render();
