# Indian Weather Dashboard

A Node.js/Express backend with a vanilla HTML/CSS/JS frontend that displays hardcoded weather data for 28 Indian state capitals.

## Project Structure

```
server.js          # Express API server (port 3000)
script.js          # Frontend JS — fetch, render, search logic
index.html         # Main page
style.css          # Styles
script.test.js     # Jest unit tests for frontend logic
server.test.js     # Jest unit tests for API endpoints
tests/             # Playwright E2E tests
```

## Commands

```bash
npm start          # Start server on http://localhost:3000
npm test           # Run Jest unit tests with coverage
npm run test:e2e   # Run Playwright E2E tests (headless)
npm run test:e2e:ui  # Run Playwright with UI mode
```

## Branch & Commit Conventions

- Branch naming: `feature/WA-<ID>` for features, `test/WA-<ID>` for test-only branches
- Commit prefix: `WA-<ID>: <description>` — always include the Jira story ID
- Never commit directly to `main`; all changes go through PRs

## Coding Standards

- **Backend:** Plain Node.js + Express, no TypeScript, no ORM
- **Frontend:** Vanilla JS only — no frameworks, no bundler
- **Tests:** Jest for unit tests; Playwright + TypeScript for E2E
- Keep server.js and script.js flat — avoid adding classes or modules unless the scope demands it

## Critical Rules

- All PRs must reference a Jira story ID in the branch name and commit message
- Do not introduce new npm dependencies without confirming with the user first
- The weather data in `server.js` is intentionally hardcoded — do not replace it with a live API unless asked
- Run `npm test` before marking any implementation task complete
- Playwright tests live in `tests/` — do not create a separate `e2e/` directory
