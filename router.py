from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from controllers.menu import (
    get_all_menus
    , get_menu
    , create_menu
    , update_menu
    , delete_menu
    
)
from controllers.billing import (
    get_all_billings
    , get_billing
    , create_billing
    , update_billing
    , delete_billing
)

from controllers.staff import (
    get_all_staffs
    , get_staff
    , create_staff
    , update_staff
    , delete_staff
    
)

from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


FRONTEND_ROUTES = {"/", "/home", "/menus", "/billings", "/staffs", "/docs"}

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


class restaurantRouter(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path

        if handle_ui_routes(self, path):
            return
        
# ==================================================
# menu 
# ==================================================
        if path == "/api/menus":
            return get_all_menus(self)
          
        if path.startswith("/api/menus/"):
            menu_id = int(path.split("/")[-1])
            return get_menu(self, menu_id)
             
# ==================================================
# BILLING 
# ==================================================

        if path == "/api/billings":
            return get_all_billings(self)
        
        
        if path.startswith("/api/billings/"):
            billing_id = int(path.split("/")[-1])
            return get_billing(self, billing_id)
                       
# ==================================================
# staff
# ==================================================
        if path == "/api/staffs":
            return get_all_staffs(self)
        
        
        if path.startswith("/api/staffs/"):
            staff_id = int(path.split("/")[-1])
            return get_staff(self, staff_id)
        
        return send_404(self)
    
# ---------- POST ----------
    def do_POST(self):
        if self.path == "/api/menus":
            return create_menu(self)

        if self.path == "/api/billings":
            return create_billing(self)
        
        if self.path == "/api/staffs":
            return create_staff(self)
        
        return send_404(self)
    
    # ---------- put ----------
    def do_PUT(self):

        if self.path.startswith("/api/menus/"):
            menu_id = int(self.path.split("/")[-1])
            return update_menu(self, menu_id)

        if self.path.startswith("/api/billings/"):
            billing_id = int(self.path.split("/")[-1])
            return update_billing(self, billing_id)
        
        if self.path.startswith("/api/staffs/"):
            staff_id = int(self.path.split("/")[-1])
            return update_staff(self, staff_id)
        
        return send_404(self)
    
    # ---------- delete ----------
    def do_DELETE(self):
        if self.path.startswith("/api/menus/"):
             menu_id = int(self.path.split("/")[-1])
             return delete_menu(self, menu_id)


        if self.path.startswith("/api/billings/"):
            billing_id = int(self.path.split("/")[-1])
            return delete_billing(self, billing_id)
        
        if self.path.startswith("/api/staffs/"):
             staff_id = int(self.path.split("/")[-1])
             return delete_staff(self, staff_id)
        
        return send_404(self)
    
     # ---------- logging ----------
    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")
    