import { ROADMAP_DATA } from '../data/index.js';
import { renderHeader } from '../components/header.js';
import { renderNav } from '../components/nav.js';
import { getVisibleWeeksForPhase } from './filters.js';
import { getDashboardMetrics, getWeekStats } from './metrics.js';
import { getEvidence, getTaskState, loadStore, saveStore, setTaskStatus } from './persistence.js';
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
  document.getElementById('header-root').innerHTML = renderHeader();
  document.getElementById('nav-root').innerHTML = renderNav(ROADMAP_DATA.phases, phase);

  document.getElementById('main').innerHTML = renderMain({
    phase,
    filters: store.settings.filters,
    getVisibleWeeksForPhase: (weeks, p, filters, getState) => getVisibleWeeksForPhase(weeks, p, filters, getState, localGetEvidence),
    getWeekStats: (week, getState) => getWeekStats(week, getState, localGetEvidence),
    getTaskState: localGetTaskState,
    getDashboardMetrics: (tasks, weeks, getState) => getDashboardMetrics(tasks, weeks, getState, localGetEvidence),
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

render();
