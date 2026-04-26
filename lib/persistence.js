import { DEFAULT_EVIDENCE, DEFAULT_FILTERS, DEFAULT_REVIEW, ROADMAP_DATA, STATUS_META, STORAGE } from '../data/index.js';

const BOARD_COLUMNS = ['this_week', 'in_progress', 'blocked', 'completed'];
const COLUMN_TO_STATUS = {
  this_week: 'not_started',
  in_progress: 'in_progress',
  blocked: 'blocked',
  completed: 'done',
};
const STATUS_TO_COLUMN = {
  not_started: 'this_week',
  in_progress: 'in_progress',
  blocked: 'blocked',
  done: 'completed',
  reviewed: 'completed',
  shipped: 'completed',
};

function createDefaultStore() {
  return {
    schemaVersion: STORAGE.version,
    taskState: {},
    evidence: {},
    reviews: {},
    board: createDemoBoard(),
    settings: { filters: { ...DEFAULT_FILTERS } },
  };
}

function createDemoBoard() {
  const seededTasks = ROADMAP_DATA.tasks.slice(0, 12);
  const tasksById = seededTasks.reduce((acc, task, index) => {
    let column = 'this_week';
    if (index >= 3 && index < 6) column = 'in_progress';
    else if (index >= 6 && index < 8) column = 'blocked';
    else if (index >= 8) column = 'completed';
    acc[task.id] = { column };
    return acc;
  }, {});
  return { tasksById };
}

function migrateStore(parsed) {
  const normalized = {
    ...createDefaultStore(),
    ...parsed,
    settings: {
      filters: { ...DEFAULT_FILTERS, ...(parsed?.settings?.filters || {}) },
    },
    taskState: { ...(parsed?.taskState || {}) },
    evidence: { ...(parsed?.evidence || {}) },
    reviews: { ...(parsed?.reviews || {}) },
    board: {
      tasksById: { ...(parsed?.board?.tasksById || {}) },
    },
  };

  if (!parsed?.board?.tasksById || !Object.keys(parsed.board.tasksById).length) {
    normalized.board = createDemoBoard();
  }

  ROADMAP_DATA.tasks.forEach((task) => {
    const status = STATUS_META[normalized.taskState[task.id]?.status] ? normalized.taskState[task.id].status : 'not_started';
    const existingColumn = normalized.board.tasksById[task.id]?.column;
    const column = BOARD_COLUMNS.includes(existingColumn) ? existingColumn : STATUS_TO_COLUMN[status] || 'this_week';
    normalized.board.tasksById[task.id] = { column };
  });

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
  setBoardTaskColumn(store, taskId, STATUS_TO_COLUMN[status] || 'this_week');
}

function getTaskBoardColumn(store, taskId) {
  const column = store.board?.tasksById?.[taskId]?.column;
  return BOARD_COLUMNS.includes(column) ? column : 'this_week';
}

function setBoardTaskColumn(store, taskId, column) {
  if (!BOARD_COLUMNS.includes(column)) return;
  if (!store.board) store.board = { tasksById: {} };
  if (!store.board.tasksById) store.board.tasksById = {};
  store.board.tasksById[taskId] = { column };
}

function moveBoardTask(store, taskId, column) {
  if (!BOARD_COLUMNS.includes(column)) return;
  setBoardTaskColumn(store, taskId, column);
  const mappedStatus = COLUMN_TO_STATUS[column] || 'not_started';
  store.taskState[taskId] = { ...getTaskState(store, taskId), status: mappedStatus };
}

function resetBoardDemoData(store) {
  store.board = createDemoBoard();
  Object.entries(store.board.tasksById).forEach(([taskId, task]) => {
    const status = COLUMN_TO_STATUS[task.column] || 'not_started';
    store.taskState[taskId] = { ...getTaskState(store, taskId), status };
  });
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
  getTaskBoardColumn,
  setBoardTaskColumn,
  moveBoardTask,
  resetBoardDemoData,
};
