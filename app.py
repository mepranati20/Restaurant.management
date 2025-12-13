# Starts the API server and initializes the database

from http.server import HTTPServer
from router.billingRouter import billingRouter
from router import menuRouter
from router import staffRouter
from database.connection import init_database

def run_server(port=8000):
    init_database()
    server = HTTPServer(("", port), billingRouter, menuRouter, staffRouter )
    print(f"🚀 server running at http://localhost:8000")
    server.serve_forever()

if __name__ == "__main__":
 run_server()