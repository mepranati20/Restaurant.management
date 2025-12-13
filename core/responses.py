# Handles incoming HTTP request data (reads JSON from the client)

import json

def parse_json_body(handler):
    """Read and decode JSON from HTTP request body."""
    length = int(handler.headers.get("Content-Length", 0))
    raw = handler.rfile.read(length)
    return json.loads(raw.decode("utf-8"))


# Sends JSON response to the client
def send_json(handler, data, status=200):
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json")
    handler.end_headers()
    handler.wfile.write(json.dumps(data).encode("utf-8"))


# Sends 404 response
def send_404(handler):
    handler.send_response(404)
    handler.send_header("Content-Type", "application/json")
    handler.end_headers()
    handler.wfile.write(
        json.dumps({"error": "Not Found"}).encode("utf-8")
    )