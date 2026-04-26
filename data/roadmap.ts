import { C, PHASES, ROADMAP_DATA, TRACKS } from '../data/index.js';
import type { Milestone, Phase, Track } from '../types/roadmap';

const phases: Phase[] = Object.entries(PHASES).map(([id, phase]) => ({
  id: Number(id),
  name: phase.name,
  dates: phase.dates,
  goal: phase.goal,
}));

const tracks: Track[] = Object.entries(TRACKS).map(([id, track]) => ({
  id,
  name: track.name,
  color: C[id],
}));

const milestones: Milestone[] = ROADMAP_DATA.weeks.map((week) => ({
  id: `ms-${week.id}`,
  title: week.title,
  phaseId: week.phaseNumber,
  weekId: week.id,
  status: 'not_started',
}));

export { milestones, phases, tracks };
