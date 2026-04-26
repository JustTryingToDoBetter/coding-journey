# Coding Journey

A single-page roadmap dashboard for tracking a 24-week technical growth plan toward senior technical leadership.

## Purpose

This project helps you plan, track, and review execution across a 6‑month growth roadmap by combining:

- milestone-level planning,
- task-level status tracking,
- weekly board management,
- evidence and reflection capture,
- readiness and capability scoring.

It is designed for **personal operating cadence** (daily/weekly) and **portfolio-ready output** (shipped artifacts + evidence).

## Tech Stack

- **Runtime/UI:** Browser-native HTML + CSS + JavaScript modules.
- **Data model:** Static roadmap/task dataset in `data/`.
- **State persistence:** `localStorage` (no backend required).
- **Validation & selectors:** Lightweight utility modules in `lib/`.
- **Tests:** Node built-in test runner (`node --test`) for utilities.

## Local Setup

### Requirements

- Node.js 18+ (for test execution)
- Any modern browser

### Run locally

Because this is a static app, there is no build step.

1. Start a local static server:
   ```bash
   python3 -m http.server 8080
   ```
2. Open:
   - `http://localhost:8080`

### Run tests

```bash
npm test
```

## Architecture Overview

- `index.html` – app shell, metadata, landmarks, and root mount points.
- `components/` – render functions for UI sections (header, nav, board, cards).
- `lib/app.js` – client entrypoint, event wiring, memoized derived data, deferred rendering.
- `lib/metrics.js` – milestone/dashboard/readiness metrics.
- `lib/selectors.js` + `lib/validation.js` – normalization/filtering/validation helpers.
- `lib/progress.js` – reusable weighted progress utility.
- `data/` – roadmap seed data and constants.
- `styles/` – design tokens + app styles.
- `tests/` – utility-level test coverage.

## Accessibility Pass Checklist

Use this checklist before shipping:

- [x] **Semantic landmarks:** `header`, `nav`, and `main` regions are present.
- [x] **Keyboard support:** interactive controls are native `<button>`, `<select>`, and `<details>/<summary>` elements.
- [x] **ARIA labels/states:** phase tabs include `role="tab"` and `aria-selected`; navigation has an accessible label.
- [x] **Visible focus states:** global `:focus-visible` styling and skip-link support are enabled.
- [x] **Contrast checks:** dark-glass panels and interactive states should be verified in target environments (recommend WCAG AA checks before release).

## Deployment (Vercel)

### Recommended settings

- Framework Preset: **Other**
- Build Command: _(leave empty)_
- Output Directory: `.`
- Install Command: _(optional)_ `npm ci` (only needed if running tests in CI)

### Notes

- This app is static and can be deployed as-is.
- If routing is ever added, include a fallback rewrite in `vercel.json`.
- Update Open Graph URLs in `index.html` to your production domain.

## Product Roadmap Phases

### Phase 1 — Foundation & Baseline
- Establish initial cadence, baseline task statuses, and board workflow.

### Phase 2 — Core Execution
- Build consistency via weekly milestones and higher completion rates.

### Phase 3 — Evidence Density
- Increase portfolio-quality evidence (GitHub/demo/notes/reflection) per milestone.

### Phase 4 — Systems Thinking
- Improve architecture and delivery signals through cross-track projects.

### Phase 5 — Leadership Readiness
- Strengthen ownership, communication, and business-impact narratives.

### Phase 6 — Consolidation & Promotion Packet
- Convert outcomes into a cohesive readiness story and promotion artifacts.

## Maintainability Guardrails

- Keep derived computation in utility modules, not in event handlers.
- Prefer memoized selectors/signature-based caches for expensive aggregates.
- Avoid full rerenders when input value/state has not changed.
- Defer non-critical/heavy sections after first paint.
- Add utility tests for any new data validation or progress calculation logic.
