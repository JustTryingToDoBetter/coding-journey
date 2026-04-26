import { TRACKS, formatPct } from '../data/index.js';
import { renderTaskCard } from './taskCard.js';

export function renderWeekCard(milestone, stats, getTaskState) {
  const skills = milestone.skillsTrained.map((skillId) => TRACKS[skillId]?.name || skillId).join(' · ');
  return `<details class="wcard card" id="${milestone.id}" open>
    <summary class="whdr">
      <div class="whdr-l">
        <div class="wmeta"><span class="wnum">Milestone ${String(milestone.priority).padStart(2, '0')}</span><span class="wdates">${milestone.week.dates}</span></div>
        <div class="wtitle">${milestone.title}</div>
        <div class="wfocus">${milestone.description}</div>
      </div>
      <div class="week-metrics">
        <span class="week-chip">${formatPct(stats.completionPct)} complete</span>
        <span class="week-chip">${stats.evidenceCount} evidence</span>
      </div>
    </summary>
    <div class="week-summary">
      <div class="week-metrics">
        <span class="week-chip">Skills: ${skills}</span>
        <span class="week-chip">Expected Output: ${milestone.expectedOutput}</span>
        <span class="week-chip">Difficulty: ${milestone.difficulty}</span>
        <span class="week-chip">Status: ${stats.status}</span>
        <span class="week-chip">Evidence: ${milestone.evidencePlaceholder}</span>
      </div>
    </div>
    <div class="dgrid">${milestone.visibleTasks.map((task) => renderTaskCard(task, getTaskState(task.id))).join('')}</div>
  </details>`;
}
