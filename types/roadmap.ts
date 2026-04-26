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
  phaseId: number;
  weekId?: string;
  status: TaskStatus;
}

export interface Skill {
  id: string;
  name: string;
  trackId: string;
  difficulty: Difficulty;
  linkedMilestone: string;
  status: TaskStatus;
  notes?: string;
}

export interface Evidence {
  id: string;
  taskId: string;
  notes?: string;
  url?: string;
  artifact?: string;
  updatedAt?: string;
}

export interface WeeklyTask {
  id: string;
  weekId: string;
  weekNumber: number;
  phaseNumber: number;
  dayLabel: string;
  trackId: string;
  platformId: string;
  title: string;
  conceptText: string;
  concepts: string[];
  durationHours: number;
  durationLabel: string;
  exam: boolean;
  kind: 'project' | 'theory' | 'practice';
  difficulty: Difficulty;
  linkedMilestone: string;
  status: TaskStatus;
}

export interface Reflection {
  id: string;
  weekId: string;
  summary: string;
  wins: string;
  blockers: string;
  nextSteps: string;
}
