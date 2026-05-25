# Product Snapshot

## What It Is

`alex-1883-test-32` is a small static browser clock with a responsive SVG
analog face. It can be opened directly from disk or served by any simple static
HTTP server.

## What It Does

- Shows the user's current local time on an analog clock face.
- Renders a circular face, 12 tick marks, and distinct hour, minute, and second
  hands.
- Computes hand angles from the current `Date`, with smooth hour/minute motion
  and a discrete ticking second hand.
- Updates immediately on page load, then aligns the recurring tick loop to the
  next wall-clock second.
- Stays centered in a neutral full-viewport layout and remains within desktop,
  mobile, and wide browser viewports.

## Current Architecture

- `index.html` contains the page shell and inline SVG clock markup.
- `styles.css` owns the page reset, centering, responsive SVG sizing, and analog
  face/hand styling.
- `clock.js` owns `computeAngles(date)`, hand rendering, DOM startup, and tick
  scheduling.
- `README.md` documents local usage, test commands, and includes the current
  screenshot at `docs/screenshot.png`.
- Unit tests use Node's built-in test runner for angle computation, hand
  rendering, and tick timing.
- Playwright covers Chromium, Firefox, WebKit, and mobile Chromium, checking
  rendering, ticking, viewport fit, and absence of browser console/page errors.
- There is no build step, backend, database, or framework.

## Conventions

- Keep the app plain HTML, CSS, and JavaScript unless a future requirement
  clearly justifies more tooling.
- Keep `computeAngles(date)` pure and independently testable.
- Preserve the SVG hand selectors: `#hand-hour`, `#hand-minute`, and
  `#hand-second`.
- Preserve direct `index.html` usage and static-server usage.
- Do not commit local secrets, dependency folders, Playwright output, or
  agent/runtime metadata.
