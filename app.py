import os
from http.server import ThreadingHTTPServer
from router import restaurantRouter
from database.connection import init_database

def run_server(port=8000):
    init_database()
    port = int(os.environ.get("PORT", "8000"))
    server = ThreadingHTTPServer(("0.0.0.0", port), restaurantRouter)
    print(f"🚀 Server running at http://localhost:{port}")
    server.serve_forever()


if __name__ == "__main__":
    run_server()

