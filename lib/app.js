import { ROADMAP_DATA } from '../data/index.js';
import { renderHeader } from '../components/header.js';
import { renderNav } from '../components/nav.js';
import { getVisibleMilestonesForPhase } from './filters.js';
import {
  getBoardMetrics,
  getCurrentFocus,
  getDashboardMetrics,
  getMilestoneStats,
  getNext90DayPlan,
  getSeniorManagerReadiness,
  getSkillScores,
} from './metrics.js';
import {
  clearWeeklyPlan,
  getEvidence,
  getTaskBoardColumn,
  getTaskState,
  loadStore,
  moveBoardTask,
  resetAllProgress,
  resetBoardDemoData,
  saveStore,
  setTaskStatus,
} from './persistence.js';
import { renderDeferredInsights, renderMain } from './viewRenderer.js';

let phase = 1;
const store = loadStore();
let derivedCache = { signature: '', metrics: null };

function localGetTaskState(taskId) {
  return getTaskState(store, taskId);
}
function localGetEvidence(taskId) {
  return getEvidence(store, taskId);
}

function computeStateSignature() {
  const statuses = Object.entries(store.taskState)
    .map(([taskId, value]) => `${taskId}:${value.status}`)
    .sort()
    .join('|');
  const evidence = Object.entries(store.evidence)
    .map(([taskId, value]) => `${taskId}:${Object.values(value || {}).filter(Boolean).length}`)
    .sort()
    .join('|');
  return `${phase}::${statuses}::${evidence}::${JSON.stringify(store.settings)}`;
}

function getMemoizedMetrics() {
  const signature = computeStateSignature();
  if (derivedCache.signature === signature && derivedCache.metrics) return derivedCache.metrics;
  const metrics = getDashboardMetrics(ROADMAP_DATA.tasks, ROADMAP_DATA.weeks, localGetTaskState, localGetEvidence);
  derivedCache = { signature, metrics };
  return metrics;
}

function hydrateDeferredSections(metrics) {
  const target = document.getElementById('deferred-insights');
  if (!target) return;
  const lazyRender = () => {
    target.outerHTML = renderDeferredInsights({
      getEvidence: localGetEvidence,
      evidenceFilters: store.settings.evidenceFilters,
      metrics,
      getSkillScores,
      getTaskState: localGetTaskState,
      getSeniorManagerReadiness,
      getMilestoneStats: (milestone) => getMilestoneStats(milestone, localGetTaskState, localGetEvidence),
      getNext90DayPlan,
    });
  };
  if (typeof requestIdleCallback === 'function') requestIdleCallback(lazyRender, { timeout: 400 });
  else setTimeout(lazyRender, 0);
}

function render() {
  const milestoneByWeekId = ROADMAP_DATA.milestones.reduce((acc, milestone) => {
    acc[milestone.weekId] = milestone;
    return acc;
  }, {});
  const priorityWeight = { urgent: 0, high: 1, medium: 2, low: 3 };
  const boardSort = (a, b) => {
    if (a.column !== 'blocked' && b.column !== 'blocked') {
      const ap = priorityWeight[a.priority] ?? 99;
      const bp = priorityWeight[b.priority] ?? 99;
      if (ap !== bp) return ap - bp;
      if (a.dueDate !== b.dueDate) return (a.dueDate || '9999-12-31').localeCompare(b.dueDate || '9999-12-31');
    }
    if (a.column !== 'blocked' && b.column === 'blocked') return -1;
    if (a.column === 'blocked' && b.column !== 'blocked') return 1;
    return a.title.localeCompare(b.title);
  };
  const boardTasks = ROADMAP_DATA.tasks
    .filter((task) => store.board?.tasksById?.[task.id])
    .map((task) => ({
      ...task,
      column: getTaskBoardColumn(store, task.id),
      milestoneTitle: milestoneByWeekId[task.weekId]?.title || 'Unlinked milestone',
    }))
    .filter((task) => task.column !== 'this_week' || task.isActiveThisWeek)
    .sort(boardSort);
  const boardMetrics = getBoardMetrics(boardTasks, store.settings.boardCapacity);
  const metrics = getMemoizedMetrics();

  document.getElementById('header-root').innerHTML = renderHeader();
  document.getElementById('nav-root').innerHTML = renderNav(ROADMAP_DATA.phases, phase);

  document.getElementById('main').innerHTML = renderMain({
    phase,
    filters: store.settings.filters,
    evidenceFilters: store.settings.evidenceFilters,
    getVisibleMilestonesForPhase: (milestones, weeks, p, filters, getState) =>
      getVisibleMilestonesForPhase(milestones, weeks, p, filters, getState, localGetEvidence),
    getMilestoneStats: (milestone) => getMilestoneStats(milestone, localGetTaskState, localGetEvidence),
    getCurrentFocus,
    getTaskState: localGetTaskState,
    getEvidence: localGetEvidence,
    getDashboardMetrics: () => metrics,
    getSkillScores,
    getSeniorManagerReadiness,
    getNext90DayPlan,
    boardTasks,
    boardMetrics,
    boardCapacity: store.settings.boardCapacity,
  });
  hydrateDeferredSections(metrics);
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
    if (getTaskBoardColumn(store, target.dataset.boardTaskId) === target.value) return;
    moveBoardTask(store, target.dataset.boardTaskId, target.value);
    saveStore(store);
    render();
    return;
  }
  if (target.matches('.status-select')) {
    if (getTaskState(store, target.dataset.taskId).status === target.value) return;
    setTaskStatus(store, target.dataset.taskId, target.value);
    saveStore(store);
    render();
    return;
  }
  if (target.matches('[data-filter]')) {
    if (store.settings.filters[target.dataset.filter] === target.value) return;
    store.settings.filters[target.dataset.filter] = target.value;
    saveStore(store);
    render();
  }
  if (target.matches('[data-evidence-filter]')) {
    if (store.settings.evidenceFilters[target.dataset.evidenceFilter] === target.value) return;
    store.settings.evidenceFilters[target.dataset.evidenceFilter] = target.value;
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
  if (target.matches('[data-evidence-filter="search"]')) {
    store.settings.evidenceFilters.search = target.value;
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
    return;
  }
  const clearWeeklyButton = event.target.closest('[data-action="clear-weekly-plan"]');
  if (clearWeeklyButton) {
    clearWeeklyPlan(store);
    saveStore(store);
    render();
    return;
  }
  const resetProgressButton = event.target.closest('[data-action="reset-progress"]');
  if (resetProgressButton) {
    resetAllProgress(store);
    saveStore(store);
    render();
    return;
  }
  const quickMoveButton = event.target.closest('[data-action="quick-move"]');
  if (quickMoveButton) {
    moveBoardTask(store, quickMoveButton.dataset.taskId, quickMoveButton.dataset.column);
    saveStore(store);
    render();
    return;
  }

  const copyButton = event.target.closest('[data-action="copy-portfolio"]');
  if (copyButton) {
    const el = document.getElementById('portfolio-export');
    if (el?.value) navigator.clipboard?.writeText(el.value);
  }
});

render();
