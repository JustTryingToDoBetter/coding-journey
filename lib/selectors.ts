import type { TaskStatus, WeeklyTask } from '../types/roadmap';
import { isValidWeeklyTask } from './validation';

interface TaskStateLike {
  status: TaskStatus;
}

interface FiltersLike {
  track: string;
  platform: string;
  showIncomplete: boolean;
  showEvidenceOnly: boolean;
  showShippedOnly: boolean;
  search: string;
}

type GetTaskState = (taskId: string) => TaskStateLike;
type GetEvidence = (taskId: string) => Record<string, unknown>;

function normalizeTask(task: WeeklyTask): WeeklyTask {
  if (isValidWeeklyTask(task)) return task;
  return {
    ...task,
    status: task.status ?? 'not_started',
    difficulty: task.difficulty ?? 'medium',
    linkedMilestone: task.linkedMilestone ?? `ms-${task.weekId}`,
  };
}

function filterTasks(tasks: WeeklyTask[], filters: FiltersLike, getTaskState: GetTaskState, getEvidence: GetEvidence): WeeklyTask[] {
  return tasks
    .map(normalizeTask)
    .filter((task) => {
      const state = getTaskState(task.id);
      const evidence = getEvidence(task.id);
      if (filters.track !== 'all' && task.trackId !== filters.track) return false;
      if (filters.platform !== 'all' && task.platformId !== filters.platform) return false;
      if (filters.showIncomplete && ['completed', 'shipped'].includes(state.status)) return false;
      if (filters.showEvidenceOnly && !Object.values(evidence).some(Boolean)) return false;
      if (filters.showShippedOnly && state.status !== 'shipped') return false;
      if (filters.search) {
        const haystack = `${task.title} ${task.conceptText}`.toLowerCase();
        if (!haystack.includes(filters.search.toLowerCase())) return false;
      }
      return true;
    });
}

function completionFromStatuses(statuses: TaskStatus[]): number {
  const weight: Record<TaskStatus, number> = {
    not_started: 0,
    in_progress: 0.5,
    blocked: 0.25,
    completed: 1,
    shipped: 1.1,
  };
  if (!statuses.length) return 0;
  return Math.round((statuses.reduce((sum, status) => sum + weight[status], 0) / statuses.length) * 100);
}

export { completionFromStatuses, filterTasks, normalizeTask };
