import { ROADMAP_DATA } from '../data/index.js';
import type { Difficulty, Skill, WeeklyTask } from '../types/roadmap';

function toDifficulty(durationHours: number): Difficulty {
  if (durationHours <= 1) return 'easy';
  if (durationHours >= 2) return 'hard';
  return 'medium';
}

const weeklyTasks: WeeklyTask[] = ROADMAP_DATA.tasks.map((task) => ({
  ...task,
  difficulty: toDifficulty(task.durationHours),
  linkedMilestone: `ms-${task.weekId}`,
  status: 'not_started',
}));

const skills: Skill[] = weeklyTasks.map((task) => ({
  id: `skill-${task.id}`,
  name: task.title,
  trackId: task.trackId,
  difficulty: task.difficulty,
  linkedMilestone: task.linkedMilestone,
  status: task.status,
  notes: task.conceptText,
}));

export { skills, weeklyTasks };
