# Product Snapshot

## What It Is

`alex-1883-test-32` is a small dependency-free browser clock. It is a static
web page that can be opened directly from disk or served by any simple static
HTTP server.

## What It Does

- Shows the user's current local time.
- Shows the current local date.
- Shows the browser-resolved timezone.
- Updates the displayed time once per second.
- Supports light and dark color schemes through CSS media preferences.

## Current Architecture

- `index.html` is the complete application: markup, CSS, and JavaScript are all
  contained in one file.
- `README.md` documents how to open the clock directly and how to serve it with
  `python -m http.server 8080`.
- There is no package manager, build system, backend, database, or external
  runtime dependency.
- `.gitignore` excludes local secrets, runtime metadata, and common build
  outputs.

## Conventions

- Keep the app dependency-free unless a future requirement justifies tooling.
- Preserve direct `index.html` usage; changes should continue to work when the
  file is opened from the filesystem.
- Do not commit local environment files, tokens, generated build output, or
  agent/runtime metadata.
