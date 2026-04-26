import { DEFAULT_EVIDENCE, DEFAULT_FILTERS, DEFAULT_REVIEW, STATUS_META, STORAGE } from '../data/index.js';

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE.key);
    if (!raw) {
      return { taskState: {}, evidence: {}, reviews: {}, settings: { filters: { ...DEFAULT_FILTERS } } };
    }
    return {
      taskState: {},
      evidence: {},
      reviews: {},
      settings: { filters: { ...DEFAULT_FILTERS } },
      ...JSON.parse(raw),
    };
  } catch (_error) {
    return { taskState: {}, evidence: {}, reviews: {}, settings: { filters: { ...DEFAULT_FILTERS } } };
  }
}

function saveStore(store) {
  localStorage.setItem(STORAGE.key, JSON.stringify(store));
}

function getTaskState(store, taskId) {
  const current = store.taskState[taskId] || {};
  const status = STATUS_META[current.status] ? current.status : 'not_started';
  return { status };
}

function setTaskStatus(store, taskId, status) {
  if (!STATUS_META[status]) return;
  store.taskState[taskId] = { ...getTaskState(store, taskId), status };
}

function getEvidence(store, taskId) {
  return { ...DEFAULT_EVIDENCE, ...(store.evidence[taskId] || {}) };
}

function updateEvidenceField(store, taskId, field, value) {
  store.evidence[taskId] = { ...getEvidence(store, taskId), [field]: value };
}

function getReview(store, weekId) {
  return { ...DEFAULT_REVIEW, ...(store.reviews[weekId] || {}) };
}

function updateReviewField(store, weekId, field, value) {
  store.reviews[weekId] = { ...getReview(store, weekId), [field]: value };
}

export {
  loadStore,
  saveStore,
  getTaskState,
  setTaskStatus,
  getEvidence,
  updateEvidenceField,
  getReview,
  updateReviewField,
};
