import { C, TRACKS, countEvidence, formatPct, hasEvidence, statusWeight } from '../data/index.js';
import { normalizeTask } from './selectors.js';

function getWeekStats(week, getTaskState, getEvidence) {
  const tasks = week.tasks.map(normalizeTask);
  const weighted = tasks.reduce((sum, task) => sum + statusWeight(getTaskState(task.id).status), 0);
  const evidenceCount = tasks.reduce((sum, task) => sum + (hasEvidence(getEvidence(task.id)) ? 1 : 0), 0);
  const completionPct = tasks.length ? Math.round((weighted / tasks.length) * 100) : 0;
  return { weighted, evidenceCount, completionPct };
}

function getMilestoneStats(milestone, getTaskState, getEvidence) {
  const weekStats = getWeekStats(milestone.week, getTaskState, getEvidence);
  const status = weekStats.completionPct >= 100 ? 'completed' : weekStats.completionPct > 0 ? 'in_progress' : 'not_started';
  return { ...weekStats, status };
}

function getCurrentFocus(milestones, getMilestoneStatsForItem) {
  return milestones
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .find((milestone) => getMilestoneStatsForItem(milestone).status !== 'completed');
}

function getDashboardMetrics(tasks, weeks, getTaskState, getEvidence) {
  const normalizedTasks = tasks.map(normalizeTask);
  const weighted = normalizedTasks.reduce((sum, task) => sum + statusWeight(getTaskState(task.id).status), 0);
  const completedTasks = normalizedTasks.reduce((sum, task) => sum + (statusWeight(getTaskState(task.id).status) >= 1 ? 1 : 0), 0);
  const evidenceTasks = normalizedTasks.reduce((sum, task) => sum + (hasEvidence(getEvidence(task.id)) ? 1 : 0), 0);

  const completionPct = normalizedTasks.length ? Math.round((weighted / normalizedTasks.length) * 100) : 0;
  const activeWeeks = weeks.filter((week) => week.tasks.some((task) => statusWeight(getTaskState(task.id).status) > 0));
  const consistency = weeks.length ? Math.round((activeWeeks.length / weeks.length) * 100) : 0;

  const tracks = Object.entries(TRACKS).map(([trackId, meta]) => {
    const trackTasks = normalizedTasks.filter((task) => task.trackId === trackId);
    const trackWeighted = trackTasks.reduce((sum, task) => sum + statusWeight(getTaskState(task.id).status), 0);
    return {
      id: trackId,
      name: meta.name,
      color: C[trackId] || '#667',
      pct: trackTasks.length ? Math.round((trackWeighted / trackTasks.length) * 100) : 0,
    };
  });

  return {
    completionPct,
    completedTasks,
    evidenceTasks,
    consistency,
    tracks,
    pctLabel: formatPct(completionPct),
    totalEvidenceEntries: countEvidence(
      normalizedTasks.reduce((acc, task) => {
        acc[task.id] = getEvidence(task.id);
        return acc;
      }, {})
    ),
  };
}

function getBoardMetrics(boardTasks) {
  const totals = {
    total: boardTasks.length,
    completedTasks: boardTasks.filter((task) => task.column === 'completed').length,
    plannedHours: Math.round(
      boardTasks
        .filter((task) => task.column !== 'completed')
        .reduce((sum, task) => sum + (task.durationHours || 0), 0)
    ),
  };
  const completionPct = totals.total ? Math.round((totals.completedTasks / totals.total) * 100) : 0;
  const activeTrack = boardTasks
    .filter((task) => task.column === 'in_progress')
    .reduce((acc, task) => {
      acc[task.trackId] = (acc[task.trackId] || 0) + 1;
      return acc;
    }, {});
  const activeTrackId = Object.entries(activeTrack).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  return {
    completionPct,
    completedTasks: totals.completedTasks,
    plannedHours: totals.plannedHours,
    activeTrackId,
  };
}

export { getWeekStats, getMilestoneStats, getCurrentFocus, getDashboardMetrics, getBoardMetrics };
