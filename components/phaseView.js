import { PHASES } from '../data/index.js';
import { renderWeekCard } from './weekCard.js';

export function renderPhaseView(phase, visibleWeeks, weekStats, getTaskState) {
  const phaseData = PHASES[phase];
  return `<div class="phase-hdr"><div class="phase-name">${phaseData.name}</div><div class="phase-meta">${phaseData.dates} · ${phaseData.goal}</div></div>
    <div class="roadmap">${visibleWeeks.map((week) => renderWeekCard(week, weekStats(week), getTaskState)).join('')}</div>`;
}
