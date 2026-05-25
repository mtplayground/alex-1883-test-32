# Product Snapshot

## What It Is

`alex-1883-test-32` is a small static browser clock with an SVG analog face. It
can be opened directly from disk or served by any simple static HTTP server.

## What It Does

- Shows the user's current local time on an analog SVG clock face.
- Renders a circular face, 12 tick marks, and hour, minute, and second hands.
- Rotates the hands to the current local time and updates once per second.
- Aligns the first scheduled update to the next wall-clock second.
- Centers the clock in a full-viewport neutral layout.
- Keeps the clock responsive so it remains within desktop and mobile viewports.

## Current Architecture

- `index.html` is the page shell and contains the inline SVG clock markup.
- The SVG clock uses `id="clock"` with `viewBox="-50 -50 100 100"`, one face
  circle, 12 inline tick lines, and hand lines with `id="hand-hour"`,
  `id="hand-minute"`, and `id="hand-second"` anchored at the SVG origin.
- `styles.css` owns the viewport reset, centering, neutral background, SVG size,
  and clock stroke styling.
- `clock.js` owns `formatTime(date)`, `getClockAngles(date)`, DOM rendering, and
  the tick loop.
- `README.md` includes the current description, local run commands, test
  commands, and a screenshot at `docs/screenshot.png`.
- Tests use Node's built-in test runner for time formatting and Playwright for
  SVG/browser coverage across Chromium, Firefox, WebKit, and a mobile Chromium
  viewport.
- There is no app build step, backend, database, or framework.

## Conventions

- Keep the app plain HTML, CSS, and JavaScript unless a future requirement
  clearly justifies more tooling.
- Keep `formatTime(date)` pure and independently testable.
- Keep the SVG clock structure stable for the runtime hand-rotation selectors.
- Preserve direct `index.html` usage and static-server usage.
- Do not commit local secrets, dependency folders, Playwright output, or
  agent/runtime metadata.
