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

const milestones: Milestone[] = ROADMAP_DATA.milestones.map((milestone) => ({
  id: milestone.id,
  title: milestone.title,
  description: milestone.description,
  phaseNumber: milestone.phaseNumber,
  priority: milestone.priority,
  weekId: milestone.weekId,
  weeklyTaskIds: milestone.weeklyTaskIds,
  skillsTrained: milestone.skillsTrained,
  evidenceRequirements: milestone.evidenceRequirements,
  expectedOutput: milestone.expectedOutput,
  difficulty: milestone.difficulty,
  status: milestone.status,
  evidencePlaceholder: milestone.evidencePlaceholder,
}));

export { milestones, phases, tracks };
