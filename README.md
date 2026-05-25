# alex-1883-test-32

A small static browser clock that shows the current local time as `HH:MM:SS`.
It uses plain HTML, CSS, and JavaScript with no build step.

![Local Clock screenshot](docs/screenshot.png)

## Run

Open `index.html` directly in a browser, or serve the directory locally:

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Then open:

```text
http://127.0.0.1:8080/
```

## Test

Install the Node dependencies first:

```bash
npm install
npx playwright install
```

Run the formatter unit tests:

```bash
npm test
```

Run the Playwright end-to-end checks:

```bash
npm run test:e2e
```

The E2E suite verifies Chromium, Firefox, WebKit, and a mobile Chromium
viewport. It checks that the clock renders, ticks, stays within the viewport,
and produces no browser console or page errors.

## Files

- `index.html`: page shell for the clock.
- `styles.css`: centered full-viewport layout and responsive clock typography.
- `clock.js`: time formatting, rendering, and tick scheduling.
- `test/format-time.test.js`: unit coverage for `formatTime`.
- `e2e/clock.spec.js`: Playwright browser coverage.
