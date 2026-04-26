import { TRACKS, escapeHTML } from '../data/index.js';

function evidenceType(taskEvidence) {
  if (taskEvidence.githubUrl) return 'code';
  if (taskEvidence.liveUrl) return 'demo';
  if (taskEvidence.certificate || taskEvidence.certificateUrl) return 'certificate';
  if (taskEvidence.reflection || taskEvidence.notes) return 'reflection';
  return 'other';
}

function renderEvidenceVault(tasks, getEvidence, evidenceFilters) {
  const entries = tasks
    .map((task) => ({ task, evidence: getEvidence(task.id) }))
    .filter(({ evidence }) => Object.values(evidence).some(Boolean))
    .filter(({ task, evidence }) => {
      if (evidenceFilters.track !== 'all' && task.trackId !== evidenceFilters.track) return false;
      if (evidenceFilters.type !== 'all' && evidenceType(evidence) !== evidenceFilters.type) return false;
      if (evidenceFilters.search) {
        const haystack = `${task.title} ${evidence.notes || ''} ${evidence.reflection || ''}`.toLowerCase();
        if (!haystack.includes(evidenceFilters.search.toLowerCase())) return false;
      }
      return true;
    });

  return `<section class="panel product-panel">
    <div class="panel-title">Evidence Vault</div>
    <div class="filter-row evidence-vault-filters">
      <label class="filter-field"><span class="filter-label">Track</span>
        <select class="filter-select" data-evidence-filter="track">
          <option value="all" ${evidenceFilters.track === 'all' ? 'selected' : ''}>All tracks</option>
          ${Object.entries(TRACKS)
            .map(([id, track]) => `<option value="${id}" ${evidenceFilters.track === id ? 'selected' : ''}>${track.name}</option>`)
            .join('')}
        </select>
      </label>
      <label class="filter-field"><span class="filter-label">Evidence type</span>
        <select class="filter-select" data-evidence-filter="type">
          ${['all', 'code', 'demo', 'certificate', 'reflection', 'other']
            .map((type) => `<option value="${type}" ${evidenceFilters.type === type ? 'selected' : ''}>${type}</option>`)
            .join('')}
        </select>
      </label>
      <label class="filter-field"><span class="filter-label">Search</span>
        <input class="filter-input" data-evidence-filter="search" value="${escapeHTML(evidenceFilters.search || '')}" placeholder="Find evidence..." />
      </label>
    </div>
    <div class="evidence-vault-grid">
      ${entries
        .map(
          ({ task, evidence }) => `<article class="task-card card">
            <div class="task-title">${escapeHTML(task.title)}</div>
            <div class="task-copy">${escapeHTML(TRACKS[task.trackId]?.name || task.trackId)}</div>
            <div class="week-metrics">
              ${evidence.githubUrl ? `<a class="link-btn" href="${escapeHTML(evidence.githubUrl)}" target="_blank" rel="noreferrer">GitHub</a>` : ''}
              ${evidence.liveUrl ? `<a class="link-btn" href="${escapeHTML(evidence.liveUrl)}" target="_blank" rel="noreferrer">Live</a>` : ''}
              ${evidence.certificateUrl ? `<a class="link-btn" href="${escapeHTML(evidence.certificateUrl)}" target="_blank" rel="noreferrer">Certificate</a>` : ''}
              ${evidence.notes ? `<span class="week-chip">notes</span>` : ''}
              ${evidence.reflection ? `<span class="week-chip">reflection</span>` : ''}
            </div>
          </article>`
        )
        .join('')}
      ${entries.length === 0 ? '<div class="empty-copy">No evidence matches the current filters.</div>' : ''}
    </div>
  </section>`;
}

function renderPortfolioSummary(metrics) {
  const copyBlock = `Portfolio Summary\nCompletion: ${metrics.completionPct}%\nConsistency: ${metrics.consistency}%\nEvidence-backed sessions: ${metrics.evidenceTasks}\nTechnical score: ${metrics.skillScores.technicalScore}%\nLeadership score: ${metrics.skillScores.leadershipScore}%\nSenior Manager readiness: ${metrics.managerReadiness.overallScore}%\n\nTop strengths:\n${metrics.skillScores.trackScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => `- ${item.name}: ${item.score}%`)
    .join('\n')}\n\nWeak areas:\n${metrics.skillScores.weakAreas.map((item) => `- ${item.name}: ${item.score}%`).join('\n')}`;

  return `<section class="panel product-panel">
    <div class="panel-title">Portfolio Summary / Export</div>
    <textarea class="evidence-textarea" id="portfolio-export" readonly>${escapeHTML(copyBlock)}</textarea>
    <div class="week-metrics"><button class="primary-btn" data-action="copy-portfolio">Copy export format</button></div>
  </section>`;
}

function renderAnalytics(metrics) {
  return `<section class="panel product-panel">
    <div class="panel-title">Skill Scoring Analytics</div>
    <div class="dashboard-grid">
      <div class="metric-card"><span class="metric-label">Technical</span><div class="metric-value">${metrics.skillScores.technicalScore}%</div></div>
      <div class="metric-card"><span class="metric-label">Leadership</span><div class="metric-value">${metrics.skillScores.leadershipScore}%</div></div>
    </div>
    <div class="track-breakdown">
      ${metrics.skillScores.trackScores
        .map(
          (item) => `<div class="track-card"><div class="track-card-head"><span class="track-name">${escapeHTML(item.name)}</span><span>${item.score}%</span></div>
              <div class="track-bar"><div class="track-fill" style="width:${item.score}%"></div></div></div>`
        )
        .join('')}
    </div>
    <div class="week-summary"><span class="week-chip">Weak areas: ${metrics.skillScores.weakAreas.map((w) => escapeHTML(w.name)).join(' · ') || 'None'}</span></div>
    <ul class="recommendation-list">${metrics.skillScores.recommendations.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul>
  </section>`;
}

function renderSeniorManagerReadiness(metrics) {
  return `<section class="panel product-panel">
    <div class="panel-title">Senior Manager Readiness</div>
    <div class="metric-card"><span class="metric-label">Overall readiness</span><div class="metric-value">${metrics.managerReadiness.overallScore}%</div></div>
    <div class="track-breakdown">${metrics.managerReadiness.dimensions
      .map(
        (item) => `<div class="track-card"><div class="track-card-head"><span class="track-name">${escapeHTML(item.label)}</span><span>${item.score}%</span></div>
      <div class="track-bar"><div class="track-fill" style="width:${item.score}%"></div></div></div>`
      )
      .join('')}</div>
  </section>`;
}

function renderNext90Days(metrics) {
  return `<section class="panel product-panel">
    <div class="panel-title">Next 90 Days Plan</div>
    <div class="next-plan-grid">${metrics.next90.plan
      .map(
        (window) => `<article class="track-card"><div class="track-name">${escapeHTML(window.window)} — ${escapeHTML(window.goal)}</div>
          <ul>${window.actions.map((action) => `<li>${escapeHTML(action)}</li>`).join('')}</ul></article>`
      )
      .join('')}</div>
    <div class="week-summary"><span class="week-chip">Reflection prompts</span></div>
    <ul>${metrics.next90.reflectionPrompts.map((prompt) => `<li>${escapeHTML(prompt)}</li>`).join('')}</ul>
  </section>`;
}

export function renderProductLayers({ tasks, getEvidence, evidenceFilters, metrics }) {
  return `<div class="product-layers-grid">
    ${renderEvidenceVault(tasks, getEvidence, evidenceFilters)}
    ${renderPortfolioSummary(metrics)}
    ${renderAnalytics(metrics)}
    ${renderSeniorManagerReadiness(metrics)}
    ${renderNext90Days(metrics)}
  </div>`;
}
