export function renderDashboardCards(metrics, currentFocus) {
  const focusHtml = currentFocus
    ? `<section class="focus-panel panel">
        <div class="panel-title">Current Focus</div>
        <div class="focus-title">${currentFocus.title}</div>
        <div class="focus-copy">${currentFocus.description}</div>
        <div class="focus-meta">
          <span class="week-chip">Milestone ${String(currentFocus.priority).padStart(2, '0')}</span>
          <span class="week-chip">${currentFocus.stats.completionPct}% complete</span>
          <span class="week-chip">${currentFocus.stats.evidenceCount} evidence</span>
        </div>
      </section>`
    : '';

  return `<section class="dashboard-panel panel">
    <div class="panel-title">Execution Dashboard</div>
    <div class="dashboard-grid">
      <div class="metric-card"><span class="metric-label">Completion</span><div class="metric-value">${metrics.pctLabel}</div></div>
      <div class="metric-card"><span class="metric-label">Consistency</span><div class="metric-value">${metrics.consistency}%</div></div>
      <div class="metric-card"><span class="metric-label">Completed Sessions</span><div class="metric-value">${metrics.completedTasks}</div></div>
      <div class="metric-card"><span class="metric-label">Evidence-backed</span><div class="metric-value">${metrics.evidenceTasks}</div></div>
    </div>
  </section>${focusHtml}`;
}
