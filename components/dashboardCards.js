export function renderDashboardCards(metrics) {
  return `<section class="dashboard-panel panel">
    <div class="panel-title">Execution Dashboard</div>
    <div class="dashboard-grid">
      <div class="metric-card"><span class="metric-label">Completion</span><div class="metric-value">${metrics.pctLabel}</div></div>
      <div class="metric-card"><span class="metric-label">Consistency</span><div class="metric-value">${metrics.consistency}%</div></div>
      <div class="metric-card"><span class="metric-label">Completed Sessions</span><div class="metric-value">${metrics.completedTasks}</div></div>
      <div class="metric-card"><span class="metric-label">Evidence-backed</span><div class="metric-value">${metrics.evidenceTasks}</div></div>
    </div>
  </section>`;
}
