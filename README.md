# alex-1883-test-32

A small dependency-free browser clock. The clock shows the current local time,
date, and timezone, and updates once per second.

## Open directly

Open `index.html` in a browser from this repository:

```bash
open index.html
```

On Linux, use:

```bash
xdg-open index.html
```

You can also double-click `index.html` in a file manager. The page does not
require a build step or network access.

## Serve locally

For a local HTTP server, run:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

Stop the server with `Ctrl+C`.

## Files

- `index.html`: the complete clock app.
- `.gitignore`: excludes local secrets, runtime metadata, and common build
  outputs.
