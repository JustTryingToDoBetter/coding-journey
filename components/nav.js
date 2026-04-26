export function renderNav(phases, activePhase) {
  return `
    <div class="nav"><div class="nav-inner">
      ${phases
        .map(
          (phase) => `<button class="tab btn ${phase.number === activePhase ? 'active' : ''}" data-phase="${phase.number}">
            <span>${phase.name}</span>
          </button>`
        )
        .join('')}
      <button class="tab btn ${activePhase === 7 ? 'active' : ''}" data-phase="7">Resources</button>
    </div></div>
  `;
}
