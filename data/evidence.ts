import { DEFAULT_EVIDENCE } from '../data/index.js';
import type { Evidence, Reflection } from '../types/roadmap';

const evidenceSeed: Evidence[] = [];

const reflectionTemplate: Reflection = {
  id: 'reflection-template',
  weekId: '',
  summary: DEFAULT_EVIDENCE.notes,
  wins: '',
  blockers: '',
  nextSteps: '',
};

export { evidenceSeed, reflectionTemplate };
