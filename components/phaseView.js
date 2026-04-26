import { PHASES } from '../data/index.js';
import { renderWeekCard } from './weekCard.js';

export function renderPhaseView(phase, visibleMilestones, getMilestoneStats, getTaskState) {
  const phaseData = PHASES[phase];
  return `<div class="phase-hdr"><div class="phase-name">${phaseData.name}</div><div class="phase-meta">${phaseData.dates} · ${phaseData.goal}</div></div>
    <div class="roadmap">${visibleMilestones.map((milestone) => renderWeekCard(milestone, getMilestoneStats(milestone), getTaskState)).join('')}</div>`;
}
