import { PL, TRACKS } from '../data/index.js';

export function renderFilterPanel(filters, visibleCount) {
  return `<section class="filter-panel">
    <div class="panel-title">Filters And Search</div>
    <div class="filter-row">
      <label class="filter-field"><span class="filter-label">Track</span>
        <select class="filter-select" data-filter="track">
          <option value="all">All tracks</option>
          ${Object.entries(TRACKS).map(([id, t]) => `<option value="${id}" ${filters.track === id ? 'selected' : ''}>${t.name}</option>`).join('')}
        </select>
      </label>
      <label class="filter-field"><span class="filter-label">Platform</span>
        <select class="filter-select" data-filter="platform">
          <option value="all">All platforms</option>
          ${Object.entries(PL).map(([id, p]) => `<option value="${id}" ${filters.platform === id ? 'selected' : ''}>${p}</option>`).join('')}
        </select>
      </label>
      <label class="filter-field"><span class="filter-label">Search</span>
        <input class="filter-input" data-filter="search" value="${filters.search || ''}" placeholder="Task title or concept" />
      </label>
    </div>
    <div class="app-note">${visibleCount} tasks match the current view.</div>
  </section>`;
}
