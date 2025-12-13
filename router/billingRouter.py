from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from database.queries import (
    get_all_billing
    , get_billing
    , create_billing
    , update_billing
    , delete_billing
    
   
)

from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


FRONTEND_ROUTES = {"/", "/home", "/billing", "/docs"}
def billingRouter():
    print("Billing router loaded")

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


class billingRouter(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path

        if handle_ui_routes(self, path):
            return

       
        if path == "/api/billing":
            return get_all_billing(self)
        
        
        if path.startswith("/api/billing/"):
               billing_id = int(path.split("/")[-1])
        return get_billing(self, billing_id)
        
        return send_404(self)
           
            
    def do_POST(self):
        if self.path == "/api/billing":
            return create_billing(self)
        return send_404(self)
    
    def do_PUT(self):
        if self.path.startswith("/api/billing/"):
            billing_id = int(self.path.split("/")[-1])
            return update_billing(self, billing_id)
        return send_404(self)
    
    def do_DELETE(self):
        if self.path.startswith("/api/billing/"):
            billing_id = int(self.path.split("/")[-1])
            return delete_billing(self, billing_id)
        return send_404(self)

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")