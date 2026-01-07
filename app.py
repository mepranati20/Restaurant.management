# Starts the API server and initializes the database

from http.server import HTTPServer
from router import restaurantRouter
from database.connection import init_database
from services.join_service import join_operation

            
def run_server(port=8000):
    init_database()
    server = HTTPServer(("", port), restaurantRouter)
    print(f"🚀 Server running at http://localhost:{port}")
    server.serve_forever()


if __name__ == "__main__":
    run_server()