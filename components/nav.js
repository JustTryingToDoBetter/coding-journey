export function renderNav(phases, activePhase) {
  return `
    <div class="nav"><div class="nav-inner">
      ${phases
        .map(
          (phase) => `<button class="tab btn ${phase.number === activePhase ? 'active' : ''}" data-phase="${phase.number}">
            <span>${phase.name.replace('Phase ', '')}</span>
          </button>`
        )
        .join('')}
      <button class="tab btn ${activePhase === 5 ? 'active' : ''}" data-phase="5">Resources</button>
    </div></div>
  `;
}
