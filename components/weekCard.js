import { formatPct } from '../data/index.js';
import { renderTaskCard } from './taskCard.js';

export function renderWeekCard(week, stats, getTaskState) {
  return `<section class="wcard card open" id="${week.id}">
    <div class="whdr">
      <div class="whdr-l">
        <div class="wmeta"><span class="wnum">Week ${String(week.number).padStart(2, '0')}</span><span class="wdates">${week.dates}</span></div>
        <div class="wtitle">${week.title}</div>
        <div class="wfocus">${week.focus}</div>
      </div>
      <div class="week-metrics">
        <span class="week-chip">${formatPct(stats.completionPct)} complete</span>
        <span class="week-chip">${stats.evidenceCount} evidence</span>
      </div>
    </div>
    <div class="dgrid">${week.visibleTasks.map((task) => renderTaskCard(task, getTaskState(task.id))).join('')}</div>
  </section>`;
}
