import { STATUS_META, badge, escapeHTML, trackPill } from '../data/index.js';

export function renderTaskCard(task, state) {
  return `<article class="task-card card" data-status="${state.status}" data-track="${task.trackId}">
    <div class="task-top">
      <span class="daypill">${escapeHTML(task.dayLabel)}</span>
      ${trackPill(task.trackId)}
      ${badge(task.platformId)}
      <span class="dhrs">${escapeHTML(task.durationLabel)}</span>
      <span class="status-chip ${state.status}">${escapeHTML(STATUS_META[state.status].label)}</span>
    </div>
    <div class="task-title">${escapeHTML(task.title)}</div>
    <div class="task-copy">${escapeHTML(task.conceptText)}</div>
    <label class="filter-field task-status-field"><span class="filter-label">Status</span>
      <select class="status-select" data-task-id="${task.id}">
        ${Object.keys(STATUS_META)
          .map((key) => `<option value="${key}" ${state.status === key ? 'selected' : ''}>${STATUS_META[key].label}</option>`)
          .join('')}
      </select>
    </label>
  </article>`;
}
