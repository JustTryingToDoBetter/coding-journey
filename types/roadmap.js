/**
 * @typedef {Object} Evidence
 * @property {string} id
 * @property {string} taskId
 * @property {string} weekId
 * @property {string} trackId
 * @property {'code'|'demo'|'certificate'|'reflection'|'other'} type
 * @property {string} title
 * @property {string=} githubUrl
 * @property {string=} liveUrl
 * @property {string=} certificateUrl
 * @property {string=} notes
 * @property {string=} reflection
 * @property {string=} createdAt
 */

/**
 * @typedef {Object} ProjectShowcase
 * @property {string} id
 * @property {string} projectName
 * @property {string} summary
 * @property {string} problem
 * @property {string[]} outcomes
 * @property {string[]} techStack
 * @property {string[]} evidenceIds
 * @property {string[]} impactMetrics
 * @property {'individual_contributor'|'tech_lead'|'manager'} role
 */

/**
 * @typedef {Object} RoadmapTask
 * @property {string} id
 * @property {string} weekId
 * @property {number} weekNumber
 * @property {number} phaseNumber
 * @property {string} dayLabel
 * @property {string} trackId
 * @property {string} platformId
 * @property {string} title
 * @property {string} conceptText
 * @property {string[]} concepts
 * @property {number} durationHours
 * @property {string} durationLabel
 * @property {boolean} exam
 * @property {'project'|'theory'|'practice'} kind
 */

/**
 * @typedef {Object} RoadmapWeek
 * @property {string} id
 * @property {number} number
 * @property {number} phaseNumber
 * @property {string} dates
 * @property {string} title
 * @property {string} focus
 * @property {RoadmapTask[]} tasks
 */
