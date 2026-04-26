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
