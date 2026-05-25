# Product Snapshot

## What It Is

`alex-1883-test-32` is a small static browser clock. It can be opened directly
from disk or served by any simple static HTTP server.

## What It Does

- Shows the user's current local time as `HH:MM:SS`.
- Updates the displayed time once per second.
- Aligns the first scheduled update to the next wall-clock second.
- Centers the clock in a full-viewport neutral layout.
- Uses responsive monospace typography with tabular digits so the display stays
  stable as seconds tick.

## Current Architecture

- `index.html` is the page shell and links `styles.css` and `clock.js`.
- `styles.css` owns the viewport reset, centering, neutral background, and clock
  typography.
- `clock.js` owns `formatTime(date)`, DOM rendering, and the tick loop.
- `README.md` includes the current description, local run commands, test
  commands, and a screenshot at `docs/screenshot.png`.
- Tests use Node's built-in test runner for `formatTime` and Playwright for
  browser coverage across Chromium, Firefox, WebKit, and a mobile Chromium
  viewport.
- There is no app build step, backend, database, or framework.

## Conventions

- Keep the app plain HTML, CSS, and JavaScript unless a future requirement
  clearly justifies more tooling.
- Keep `formatTime(date)` pure and independently testable.
- Preserve direct `index.html` usage and static-server usage.
- Do not commit local secrets, dependency folders, Playwright output, or
  agent/runtime metadata.
