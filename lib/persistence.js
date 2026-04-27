import { DEFAULT_EVIDENCE, DEFAULT_FILTERS, DEFAULT_REVIEW, STATUS_META, STORAGE } from '../data/index.js';

function createDefaultStore() {
  return {
    schemaVersion: STORAGE.version,
    taskState: {},
    evidence: {},
    reviews: {},
    settings: { filters: { ...DEFAULT_FILTERS }, evidenceFilters: { track: 'all', type: 'all', search: '' } },
  };
}

function migrateStore(parsed) {
  const normalized = {
    ...createDefaultStore(),
    ...parsed,
    settings: {
      filters: { ...DEFAULT_FILTERS, ...(parsed?.settings?.filters || {}) },
      evidenceFilters: { track: 'all', type: 'all', search: '', ...(parsed?.settings?.evidenceFilters || {}) },
    },
    taskState: { ...(parsed?.taskState || {}) },
    evidence: { ...(parsed?.evidence || {}) },
    reviews: { ...(parsed?.reviews || {}) },
  };

  normalized.schemaVersion = STORAGE.version;
  return normalized;
}

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE.key);
    if (!raw) return createDefaultStore();
    return migrateStore(JSON.parse(raw));
  } catch (_error) {
    return createDefaultStore();
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
