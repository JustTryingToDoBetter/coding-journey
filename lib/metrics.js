import { C, ROADMAP_DATA, TRACKS, countEvidence, formatPct, hasEvidence, statusWeight } from '../data/index.js';
import { normalizeTask } from './selectors.js';
import { completionFromStatuses } from './progress.js';

const EVIDENCE_FIELDS = [
  { key: 'githubUrl', label: 'GitHub link' },
  { key: 'liveUrl', label: 'Live demo link' },
  { key: 'notes', label: 'Notes' },
  { key: 'reflection', label: 'Reflection' },
];

function getWeekStats(week, getTaskState, getEvidence) {
  const tasks = week.tasks.map(normalizeTask);
  const weighted = tasks.reduce((sum, task) => sum + statusWeight(getTaskState(task.id).status), 0);
  const evidenceCount = tasks.reduce((sum, task) => sum + (hasEvidence(getEvidence(task.id)) ? 1 : 0), 0);
  const completionPct = completionFromStatuses(tasks.map((task) => getTaskState(task.id).status));
  return { weighted, evidenceCount, completionPct };
}

function getMilestoneStats(milestone, getTaskState, getEvidence) {
  const week = milestone.week || ROADMAP_DATA.weeks.find((candidate) => candidate.id === milestone.weekId);
  const milestoneTasks = week?.tasks || (milestone.weeklyTaskIds || []).map((taskId) => ROADMAP_DATA.tasks.find((task) => task.id === taskId)).filter(Boolean);
  const tasks = milestoneTasks.map(normalizeTask);
  const weekStats = week
    ? getWeekStats(week, getTaskState, getEvidence)
    : (() => {
        const weighted = tasks.reduce((sum, task) => sum + statusWeight(getTaskState(task.id).status), 0);
        const evidenceCount = tasks.reduce((sum, task) => sum + (hasEvidence(getEvidence(task.id)) ? 1 : 0), 0);
        const completionPct = tasks.length ? Math.round((weighted / tasks.length) * 100) : 0;
        return { weighted, evidenceCount, completionPct };
      })();
  const status = weekStats.completionPct >= 100 ? 'completed' : weekStats.completionPct > 0 ? 'in_progress' : 'not_started';

  const requiredEvidenceSlots = tasks.length * EVIDENCE_FIELDS.length;
  const populatedEvidenceSlots = tasks.reduce(
    (sum, task) =>
      sum +
      EVIDENCE_FIELDS.reduce((fieldCount, field) => {
        const value = getEvidence(task.id)[field.key];
        return fieldCount + (String(value || '').trim() ? 1 : 0);
      }, 0),
    0
  );
  const evidenceCoveragePct = requiredEvidenceSlots ? Math.round((populatedEvidenceSlots / requiredEvidenceSlots) * 100) : 0;
  const readinessScore = Math.round(weekStats.completionPct * 0.6 + evidenceCoveragePct * 0.4);

  const missingEvidence = EVIDENCE_FIELDS.filter((field) =>
    tasks.some((task) => !String(getEvidence(task.id)[field.key] || '').trim())
  ).map((field) => field.label);

  return { ...weekStats, status, evidenceCoveragePct, readinessScore, missingEvidence };
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
  const completionPctFromStatus = completionFromStatuses(normalizedTasks.map((task) => getTaskState(task.id).status));
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
    completionPct: completionPctFromStatus || completionPct,
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

function getSkillScores(tasks, getTaskState, getEvidence) {
  const normalizedTasks = tasks.map(normalizeTask);
  const technicalTracks = ['se', 'ml', 'fs', 'ai', 'dsa'];
  const leadershipTracks = ['prj', 'read'];

  const scoreTrack = (trackId) => {
    const trackTasks = normalizedTasks.filter((task) => task.trackId === trackId);
    const completion = trackTasks.length
      ? (trackTasks.reduce((sum, task) => sum + statusWeight(getTaskState(task.id).status), 0) / trackTasks.length) * 100
      : 0;
    const evidenceRate = trackTasks.length
      ? (trackTasks.filter((task) => hasEvidence(getEvidence(task.id))).length / trackTasks.length) * 100
      : 0;
    return Math.round(completion * 0.7 + evidenceRate * 0.3);
  };

  const trackScores = Object.keys(TRACKS).map((trackId) => ({
    trackId,
    name: TRACKS[trackId].name,
    score: scoreTrack(trackId),
  }));

  const technicalScore = Math.round(
    trackScores.filter((item) => technicalTracks.includes(item.trackId)).reduce((sum, item) => sum + item.score, 0) /
      technicalTracks.length
  );
  const leadershipScore = Math.round(
    trackScores.filter((item) => leadershipTracks.includes(item.trackId)).reduce((sum, item) => sum + item.score, 0) /
      leadershipTracks.length
  );

  const weakAreas = trackScores.filter((item) => item.score < 60).sort((a, b) => a.score - b.score).slice(0, 4);
  const recommendations = weakAreas.map((area) => `Increase shipped work and evidence density in ${area.name}.`);

  return { technicalScore, leadershipScore, trackScores, weakAreas, recommendations };
}

function getSeniorManagerReadiness(tasks, milestones, getTaskState, getEvidence, getMilestoneStatsForItem) {
  const normalizedTasks = tasks.map(normalizeTask);
  const projectTasks = normalizedTasks.filter((task) => task.kind === 'project');
  const doneProjects = projectTasks.filter((task) => statusWeight(getTaskState(task.id).status) >= 1).length;
  const shippedProjects = projectTasks.filter((task) => getTaskState(task.id).status === 'shipped').length;

  const milestoneReadiness = milestones.map((milestone) => getMilestoneStatsForItem(milestone).readinessScore);
  const averageMilestoneReadiness = milestoneReadiness.length
    ? Math.round(milestoneReadiness.reduce((sum, score) => sum + score, 0) / milestoneReadiness.length)
    : 0;

  const evidenceRatio = normalizedTasks.length
    ? Math.round((normalizedTasks.filter((task) => hasEvidence(getEvidence(task.id))).length / normalizedTasks.length) * 100)
    : 0;

  const dimensions = [
    { id: 'ownership', label: 'Ownership', score: Math.min(100, Math.round(averageMilestoneReadiness * 0.9 + shippedProjects * 3)) },
    { id: 'delivery', label: 'Delivery maturity', score: Math.min(100, Math.round((doneProjects / Math.max(projectTasks.length, 1)) * 100)) },
    { id: 'architecture', label: 'Architecture judgment', score: Math.round(averageMilestoneReadiness) },
    { id: 'leadership', label: 'Leadership', score: Math.round(evidenceRatio * 0.85) },
    { id: 'product', label: 'Product strategy', score: Math.round((averageMilestoneReadiness + evidenceRatio) / 2) },
    { id: 'business', label: 'Business impact', score: Math.min(100, Math.round(shippedProjects * 8 + evidenceRatio * 0.5)) },
  ];

  const overallScore = Math.round(dimensions.reduce((sum, dimension) => sum + dimension.score, 0) / dimensions.length);
  return { overallScore, dimensions };
}

function getNext90DayPlan(milestones, getMilestoneStatsForItem, skillScores, managerReadiness) {
  const laggingMilestones = milestones
    .map((milestone) => ({ milestone, stats: getMilestoneStatsForItem(milestone) }))
    .filter(({ stats }) => stats.readinessScore < 65)
    .slice(0, 6);

  const topWeakAreas = skillScores.weakAreas.slice(0, 3);

  const plan = [
    {
      window: 'Days 1-30',
      goal: `Close milestone evidence gaps (${laggingMilestones.length} lagging milestones).`,
      actions: [
        'Backfill GitHub/demo/reflection evidence for each project milestone.',
        'Convert all in-progress milestones into review-ready milestone briefs.',
      ],
    },
    {
      window: 'Days 31-60',
      goal: 'Raise weakest capability dimensions.',
      actions: topWeakAreas.map((area) => `Run two focused sprints in ${area.name} with measurable output artifacts.`),
    },
    {
      window: 'Days 61-90',
      goal: `Increase Senior Manager readiness from ${managerReadiness.overallScore}% to 80%+`,
      actions: [
        'Publish one architecture decision memo and one impact review per month.',
        'Lead one cross-track initiative with delivery and business metrics.',
      ],
    },
  ];

  const reflectionPrompts = [
    'Which decisions this month improved user or business outcomes most, and why?',
    'Where did execution slow down because ownership or communication was unclear?',
    'What evidence best proves readiness for broader scope leadership?',
  ];

  return { plan, reflectionPrompts };
}

export {
  getWeekStats,
  getMilestoneStats,
  getCurrentFocus,
  getDashboardMetrics,
  getSkillScores,
  getSeniorManagerReadiness,
  getNext90DayPlan,
};
