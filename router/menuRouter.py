from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from database.queries import (
    get_all_menu
    , get_menu
    , create_menu
    , update_menu
    , delete_menu
    
   
)

from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


FRONTEND_ROUTES = {"/", "/home", "/menu", "/docs"}

def handle_ui_routes(handler, path):
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True

    if path.endswith(".html"):
        stripped = path.replace(".html", "")
        if stripped in FRONTEND_ROUTES:
            serve_static(handler, "frontend/pages/index.html")
            return True
    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True

    return False


class menuRouter(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path

        if handle_ui_routes(self, path):
            return

       
        if path == "/api/menu":
            return get_all_menu(self)
        
        
        if path.startswith("/api/menu/"):
                menu_id = int(path.split("/")[-1])
                return get_menu(self, menu_id)
        
        return send_404(self)
           
            
    def do_POST(self):
        if self.path == "/api/menu":
            return create_menu(self)
        return send_404(self)
    
    def do_PUT(self):
        if self.path.startswith("/api/menu/"):
            menu_id = int(self.path.split("/")[-1])
            return update_menu(self, menu_id)
        return send_404(self)
    
    def do_DELETE(self):
        if self.path.startswith("/api/menu/"):
             menu_id = int(self.path.split("/")[-1])
             return delete_menu(self, menu_id)
        return send_404(self)

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")