export function renderNav(phases, activePhase) {
  return `
    <div class="nav"><div class="nav-inner" role="tablist" aria-label="Roadmap phase tabs">
      ${phases
        .map(
          (phase) => `<button class="tab btn ${phase.number === activePhase ? 'active' : ''}" data-phase="${phase.number}" role="tab" aria-selected="${phase.number === activePhase}" aria-label="Open ${phase.name}">
            <span>${phase.name}</span>
          </button>`
        )
        .join('')}
      <button class="tab btn ${activePhase === 7 ? 'active' : ''}" data-phase="7" role="tab" aria-selected="${activePhase === 7}" aria-label="Open supplementary resources">Resources</button>
    </div></div>
  `;
}
