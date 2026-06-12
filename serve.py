from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import os


class StaticHandler(SimpleHTTPRequestHandler):
    """Serve the static clock app and return 404 for non-static API probes."""

    def _send_not_found(self) -> None:
        self.send_error(404, "File not found")

    def do_POST(self) -> None:
        self._send_not_found()

    def do_PUT(self) -> None:
        self._send_not_found()

    def do_PATCH(self) -> None:
        self._send_not_found()

    def do_DELETE(self) -> None:
        self._send_not_found()


def main() -> None:
    port = int(os.environ.get("PORT", "8080"))
    directory = os.environ.get("STATIC_DIR", os.path.dirname(os.path.abspath(__file__)))
    server = ThreadingHTTPServer(("0.0.0.0", port), partial(StaticHandler, directory=directory))
    server.serve_forever()


if __name__ == "__main__":
    main()
