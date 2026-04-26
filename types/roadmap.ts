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

export interface Evidence {
  id: string;
  taskId: string;
  weekId: string;
  trackId: string;
  type: 'code' | 'demo' | 'certificate' | 'reflection' | 'other';
  title: string;
  githubUrl?: string;
  liveUrl?: string;
  certificateUrl?: string;
  notes?: string;
  reflection?: string;
  createdAt?: string;
}

export interface ProjectShowcase {
  id: string;
  projectName: string;
  summary: string;
  problem: string;
  outcomes: string[];
  techStack: string[];
  evidenceIds: string[];
  impactMetrics: string[];
  role: 'individual_contributor' | 'tech_lead' | 'manager';
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
