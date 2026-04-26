import { TRACKS, escapeHTML } from '../data/index.js';

const BOARD_DEFS = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'this_week', title: 'This Week' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'blocked', title: 'Blocked' },
  { id: 'completed', title: 'Completed' },
];

const MOVE_OPTIONS = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'this_week', label: 'This Week' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'blocked', label: 'Blocked' },
  { id: 'completed', label: 'Completed' },
];

function renderBoardCard(task) {
  return `<article class="board-task" data-task-id="${task.id}">
    <div class="board-task-title">${escapeHTML(task.title)}</div>
    <div class="board-task-meta">
      <span class="week-chip">${escapeHTML(task.source)}</span>
      <span class="week-chip">${escapeHTML(task.milestoneTitle)}</span>
      <span class="week-chip">${escapeHTML(TRACKS[task.trackId]?.name || task.trackId)}</span>
      <span class="week-chip">Priority: ${escapeHTML(task.priority)}</span>
      <span class="week-chip">Est: ${escapeHTML(task.durationLabel)}</span>
      <span class="week-chip">Due: ${escapeHTML(task.dueDate)}</span>
    </div>
    <div class="board-task-submeta">
      <div><strong>Next:</strong> ${escapeHTML(task.nextAction)}</div>
      <div><strong>Output:</strong> ${escapeHTML(task.outputRequired)}</div>
    </div>
    <div class="board-quick-actions">
      <button class="quiet-btn" data-action="quick-move" data-task-id="${task.id}" data-column="in_progress">Start</button>
      <button class="quiet-btn" data-action="quick-move" data-task-id="${task.id}" data-column="blocked">Block</button>
      <button class="quiet-btn" data-action="quick-move" data-task-id="${task.id}" data-column="completed">Complete</button>
      <button class="quiet-btn" data-action="quick-move" data-task-id="${task.id}" data-column="backlog">Return</button>
    </div>
    <label class="filter-field board-move-field">
      <span class="filter-label">Move to</span>
      <select class="board-move-select" data-board-task-id="${task.id}">
        ${MOVE_OPTIONS.map((option) => `<option value="${option.id}" ${task.column === option.id ? 'selected' : ''}>${option.label}</option>`).join('')}
      </select>
    </label>
  </article>`;
}

export function renderWeeklyBoard(boardTasks, boardMetrics, boardCapacity) {
  const capacityWarning = boardMetrics.overCapacity
    ? `<div class="board-warning">Weekly scope is over capacity (${boardMetrics.thisWeekCount}/${boardCapacity.maxTasks} tasks, ${boardMetrics.thisWeekHours}h/${boardCapacity.maxHours}h).</div>`
    : '';
  return `<section class="board-panel panel">
    <div class="board-head">
      <div>
        <div class="panel-title">Weekly Execution Board</div>
        <div class="app-note">Milestone-linked planning view for this week and delivery tracking.</div>
      </div>
      <div class="board-head-actions">
        <button class="ghost-btn" data-action="clear-weekly-plan">Clear weekly plan</button>
        <button class="ghost-btn" data-action="reset-progress">Reset progress</button>
        <button class="ghost-btn" data-action="reset-board">Reset to demo data</button>
      </div>
    </div>
    ${capacityWarning}
    <div class="dashboard-grid board-summary-grid">
      <div class="metric-card"><span class="metric-label">Weekly tasks completed</span><div class="metric-value">${boardMetrics.weeklyCompletedTasks}</div></div>
      <div class="metric-card"><span class="metric-label">Weekly hours completed</span><div class="metric-value">${boardMetrics.weeklyCompletedHours}h</div></div>
      <div class="metric-card"><span class="metric-label">Active workload</span><div class="metric-value">${boardMetrics.activeWorkloadHours}h</div></div>
      <div class="metric-card"><span class="metric-label">Blocked count</span><div class="metric-value">${boardMetrics.blockedCount}</div></div>
      <div class="metric-card"><span class="metric-label">Overdue count</span><div class="metric-value">${boardMetrics.overdueCount}</div></div>
    </div>
    <div class="board-grid">${BOARD_DEFS.map((column) => {
      const items = boardTasks.filter((task) => task.column === column.id);
      return `<section class="board-column">
        <div class="board-column-head">${column.title} <span class="week-chip">${items.length}</span></div>
        <div class="board-column-body">
          ${
            items.length
              ? items.map(renderBoardCard).join('')
              : `<div class="board-empty">${column.id === 'backlog' ? 'Backlog is clear. Add future tasks to plan ahead.' : column.id === 'this_week' ? 'No active tasks this week. Pull in top priorities from Backlog.' : `No tasks in ${column.title.toLowerCase()}.`}</div>`
          }
        </div>
      </section>`;
    }).join('')}</div>
  </section>`;
}
