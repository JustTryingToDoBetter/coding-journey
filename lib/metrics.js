import { C, TRACKS, countEvidence, formatPct, hasEvidence, statusWeight } from '../data/index.js';

function getWeekStats(week, getTaskState, getEvidence) {
  const weighted = week.tasks.reduce((sum, task) => sum + statusWeight(getTaskState(task.id).status), 0);
  const evidenceCount = week.tasks.reduce((sum, task) => sum + (hasEvidence(getEvidence(task.id)) ? 1 : 0), 0);
  const shipped = week.tasks.reduce((sum, task) => sum + (getTaskState(task.id).status === 'shipped' ? 1 : 0), 0);
  const completionPct = week.tasks.length ? Math.round((weighted / week.tasks.length) * 100) : 0;
  return { weighted, evidenceCount, completionPct, shipped };
}

function getDashboardMetrics(tasks, weeks, getTaskState, getEvidence) {
  const weighted = tasks.reduce((sum, task) => sum + statusWeight(getTaskState(task.id).status), 0);
  const completedTasks = tasks.reduce((sum, task) => sum + (statusWeight(getTaskState(task.id).status) >= 1 ? 1 : 0), 0);
  const shippedTasks = tasks.reduce((sum, task) => sum + (getTaskState(task.id).status === 'shipped' ? 1 : 0), 0);
  const evidenceTasks = tasks.reduce((sum, task) => sum + (hasEvidence(getEvidence(task.id)) ? 1 : 0), 0);

  const completionPct = tasks.length ? Math.round((weighted / tasks.length) * 100) : 0;
  const activeWeeks = weeks.filter((week) => week.tasks.some((task) => statusWeight(getTaskState(task.id).status) > 0));
  const consistency = weeks.length ? Math.round((activeWeeks.length / weeks.length) * 100) : 0;

  const tracks = Object.entries(TRACKS).map(([trackId, meta]) => {
    const trackTasks = tasks.filter((task) => task.trackId === trackId);
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
    shippedTasks,
    evidenceTasks,
    consistency,
    streak: activeWeeks.length,
    buildVsTheory: `${tasks.filter((t) => t.kind === 'project').length} / ${tasks.filter((t) => t.kind === 'theory').length}`,
    tracks,
    pctLabel: formatPct(completionPct),
  };
}

export { getWeekStats, getDashboardMetrics };
