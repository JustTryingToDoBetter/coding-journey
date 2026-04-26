export const TASK_STATUSES = ['not_started', 'in_progress', 'blocked', 'completed', 'shipped'] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export interface Track {
  id: string;
  name: string;
  color?: string;
}

export interface Phase {
  id: number;
  name: string;
  dates: string;
  goal: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  phaseNumber: number;
  priority: number;
  weekId: string;
  weeklyTaskIds: string[];
  skillsTrained: string[];
  evidenceRequirements: string[];
  expectedOutput: string;
  difficulty: Difficulty;
  status: 'not_started' | 'in_progress' | 'completed';
  evidencePlaceholder: string;
}
