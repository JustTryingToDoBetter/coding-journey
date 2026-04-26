import { ROADMAP_DATA, SUPP } from '../data/index.js';
import { renderDashboardCards } from '../components/dashboardCards.js';
import { renderFilterPanel } from '../components/filterPanel.js';
import { renderPhaseView } from '../components/phaseView.js';

function renderResources() {
  return `<div class="phase-hdr"><div class="phase-name">Supplementary Reading + Free Resources</div></div>
    <div class="supp-wrap">${SUPP.map((track) => `<div class="supp-cat"><div class="supp-cat-hdr"><span class="supp-cat-name">${track.title}</span></div><div class="supp-items">${track.items.map((item) => `<div class="sitem"><div class="sname">${item.n}</div><div class="sauthor">${item.a}</div><div class="sdesc">${item.d}</div></div>`).join('')}</div></div>`).join('')}</div>`;
}

export function renderMain({ phase, filters, getVisibleWeeksForPhase, getWeekStats, getTaskState, getDashboardMetrics }) {
  if (phase === 5) return renderResources();
  const visibleWeeks = getVisibleWeeksForPhase(ROADMAP_DATA.weeks, phase, filters, getTaskState);
  const visibleCount = visibleWeeks.reduce((total, week) => total + week.visibleTasks.length, 0);
  const metrics = getDashboardMetrics(ROADMAP_DATA.tasks, ROADMAP_DATA.weeks, getTaskState);

  return `<div class="app-shell">
    <div class="hero-grid">${renderDashboardCards(metrics)}${renderFilterPanel(filters, visibleCount)}</div>
    ${renderPhaseView(phase, visibleWeeks, (week) => getWeekStats(week, getTaskState), getTaskState)}
  </div>`;
}
