import { ROADMAP_DATA, SUPP } from '../data/index.js';
import { renderDashboardCards } from '../components/dashboardCards.js';
import { renderFilterPanel } from '../components/filterPanel.js';
import { renderPhaseView } from '../components/phaseView.js';
import { renderProductLayers } from '../components/productLayers.js';
import { renderWeeklyBoard } from '../components/weeklyBoard.js';

function renderResources() {
  return `<div class="phase-hdr"><div class="phase-name">Supplementary Reading + Free Resources</div></div>
    <div class="supp-wrap">${SUPP.map((track) => `<div class="supp-cat"><div class="supp-cat-hdr"><span class="supp-cat-name">${track.title}</span></div><div class="supp-items">${track.items.map((item) => `<div class="sitem"><div class="sname">${item.n}</div><div class="sauthor">${item.a}</div><div class="sdesc">${item.d}</div></div>`).join('')}</div></div>`).join('')}</div>`;
}

export function renderMain({
  phase,
  filters,
  evidenceFilters,
  getVisibleMilestonesForPhase,
  getMilestoneStats,
  getCurrentFocus,
  getTaskState,
  getEvidence,
  getDashboardMetrics,
  getSkillScores,
  getSeniorManagerReadiness,
  getNext90DayPlan,
  boardTasks,
  boardMetrics,
}) {
  if (phase === 7) return renderResources();

  const visibleMilestones = getVisibleMilestonesForPhase(ROADMAP_DATA.milestones, ROADMAP_DATA.weeks, phase, filters, getTaskState);
  const visibleCount = visibleMilestones.reduce((total, milestone) => total + milestone.visibleTasks.length, 0);
  const metrics = getDashboardMetrics(ROADMAP_DATA.tasks, ROADMAP_DATA.weeks, getTaskState);
  const currentFocusMilestone = getCurrentFocus(visibleMilestones, getMilestoneStats);
  const currentFocus = currentFocusMilestone
    ? { ...currentFocusMilestone, stats: getMilestoneStats(currentFocusMilestone) }
    : null;

  const skillScores = getSkillScores(ROADMAP_DATA.tasks, getTaskState, getEvidence);
  const managerReadiness = getSeniorManagerReadiness(
    ROADMAP_DATA.tasks,
    ROADMAP_DATA.milestones,
    getTaskState,
    getEvidence,
    getMilestoneStats
  );
  const next90 = getNext90DayPlan(ROADMAP_DATA.milestones, getMilestoneStats, skillScores, managerReadiness);

  return `<div class="app-shell">
    <div class="hero-grid">${renderDashboardCards(metrics, currentFocus)}${renderFilterPanel(filters, visibleCount)}</div>
    ${renderWeeklyBoard(boardTasks, boardMetrics)}
    ${renderPhaseView(phase, visibleMilestones, getMilestoneStats, getTaskState)}
    ${renderProductLayers({
      tasks: ROADMAP_DATA.tasks,
      getEvidence,
      evidenceFilters,
      metrics: {
        ...metrics,
        skillScores,
        managerReadiness,
        next90,
      },
    })}
  </div>`;
}
