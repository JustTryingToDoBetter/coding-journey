import { TRACKS, escapeHTML } from '../data/index.js';

const BOARD_DEFS = [
  { id: 'this_week', title: 'This Week' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'blocked', title: 'Blocked' },
  { id: 'completed', title: 'Completed' },
];

const MOVE_OPTIONS = [
  { id: 'this_week', label: 'This Week' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'blocked', label: 'Blocked' },
  { id: 'completed', label: 'Completed' },
];

function renderBoardCard(task) {
  return `<article class="board-task" data-task-id="${task.id}">
    <div class="board-task-title">${escapeHTML(task.title)}</div>
    <div class="board-task-meta">
      <span class="week-chip">${escapeHTML(task.milestoneTitle)}</span>
      <span class="week-chip">${escapeHTML(TRACKS[task.trackId]?.name || task.trackId)}</span>
      <span class="week-chip">${escapeHTML(task.durationLabel)}</span>
    </div>
    <label class="filter-field board-move-field">
      <span class="filter-label">Move to</span>
      <select class="board-move-select" data-board-task-id="${task.id}">
        ${MOVE_OPTIONS.map((option) => `<option value="${option.id}" ${task.column === option.id ? 'selected' : ''}>${option.label}</option>`).join('')}
      </select>
    </label>
  </article>`;
}

export function renderWeeklyBoard(boardTasks, boardMetrics) {
  return `<section class="board-panel panel">
    <div class="board-head">
      <div>
        <div class="panel-title">Weekly Execution Board</div>
        <div class="app-note">Milestone-linked planning view for this week and delivery tracking.</div>
      </div>
      <button class="ghost-btn" data-action="reset-board">Reset to demo data</button>
    </div>
    <div class="dashboard-grid board-summary-grid">
      <div class="metric-card"><span class="metric-label">Completion</span><div class="metric-value">${boardMetrics.completionPct}%</div></div>
      <div class="metric-card"><span class="metric-label">Active track</span><div class="metric-value">${escapeHTML(TRACKS[boardMetrics.activeTrackId]?.name || '—')}</div></div>
      <div class="metric-card"><span class="metric-label">Planned hours</span><div class="metric-value">${boardMetrics.plannedHours}h</div></div>
      <div class="metric-card"><span class="metric-label">Completed tasks</span><div class="metric-value">${boardMetrics.completedTasks}</div></div>
    </div>
    <div class="board-grid">${BOARD_DEFS.map((column) => {
      const items = boardTasks.filter((task) => task.column === column.id);
      return `<section class="board-column">
        <div class="board-column-head">${column.title} <span class="week-chip">${items.length}</span></div>
        <div class="board-column-body">
          ${
            items.length
              ? items.map(renderBoardCard).join('')
              : `<div class="board-empty">No tasks in ${column.title.toLowerCase()}.</div>`
          }
        </div>
      </section>`;
    }).join('')}</div>
  </section>`;
}
