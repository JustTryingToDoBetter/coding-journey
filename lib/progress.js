const STATUS_WEIGHTS = {
  not_started: 0,
  in_progress: 0.5,
  blocked: 0.25,
  done: 1,
  reviewed: 1,
  completed: 1,
  shipped: 1.1,
};

function completionFromStatuses(statuses) {
  if (!statuses.length) return 0;
  const weighted = statuses.reduce((sum, status) => sum + (STATUS_WEIGHTS[status] ?? 0), 0);
  return Math.round((weighted / statuses.length) * 100);
}

export { STATUS_WEIGHTS, completionFromStatuses };
