from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
from controllers.reports import get_receipt_report

from controllers.menu import (
    get_all_menus
    , get_menu
    , create_menu
    , update_menu
    , delete_menu
    
)
from controllers.billing import (
  
    get_all_billings,
    get_billing, 
    create_billing,
    update_billing,
    delete_billing,
     
)

from controllers.staff import (
    get_all_staffs
    , get_staff
    , create_staff
    , update_staff
    , delete_staff
    
)
from controllers.receipts import (
    get_all_receipts,
    get_receipt,
    create_receipt,
    delete_receipt
)


from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


FRONTEND_ROUTES = {"/", "/home", "/menus", "/billings", "/staffs", "/receipts", "reports/receipts", "/docs" ,"/infos"}

def handle_ui_routes(handler, path):
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True

    if path.endswith(".html"):
        stripped = path.replace(".html", "")
        if stripped in FRONTEND_ROUTES:
            serve_static(handler, "frontend/pages/index.html")
            return True
    if path.startswith("/assets/"):
        serve_static(handler, "frontend" + path)
        return True
    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True
    if path == "/openapi.yaml":
        serve_static(handler, "openapi.yaml")
        return True

    return False
# -------------------------------
# Helpers
# -------------------------------

def _last_path_id_or_404(handler, path):
    """
    Extract the last path segment and ensure it's a number.
    If it's not a number, return None after sending 404 (no crash).
    """
    last = path.split("/")[-1]
    if not last.isdigit():
        send_404(handler)
        return None
    return int(last)


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
            menu_id = _last_path_id_or_404(self, path)
            if menu_id is None:
                return
            return get_menu(self, menu_id)
             
# ==================================================
# BILLING 
# ==================================================
        if path == "/api/billings":
            return get_all_billings(self)
        
        
        if path.startswith("/api/billings/"):
            billing_id = _last_path_id_or_404(self, path)
            if billing_id is None:
                return
            return get_billing(self, billing_id)
                       
# ==================================================
# staff
# ==================================================
        if path == "/api/staffs":
            return get_all_staffs(self)
        
        
        if path.startswith("/api/staffs/"):
            staff_id = _last_path_id_or_404(self, path)
            if staff_id is None:
                return
            return get_staff(self, staff_id)
    
# ---------------------------
# receiptS
# ---------------------------
        if path == "/api/receipts":
            return get_all_receipts(self)

        if path.startswith("/api/receipts/"):
            receipt_id = _last_path_id_or_404(self, path)
            if receipt_id is None:
                return
            return get_receipt(self, receipt_id)
  # ---------------------------
  # REPORTS (JOIN)
  # ---------------------------
        if path == "/api/reports/receipts":
         return get_receipt_report(self)

        return send_404(self)       
    
# ---------- POST ----------
    def do_POST(self):
        path = urlparse(self.path).path

        if path == "/api/menus":
            return create_menu(self)

        if path == "/api/billings":
            return create_billing(self)
        
        if path == "/api/staffs":
            return create_staff(self)
        
        if path == "/api/receipts":
            return create_receipt(self)
        
        return send_404(self)
    
    # ---------- put ----------
    def do_PUT(self):
        path = urlparse(self.path).path
        if path.startswith("/api/menus/"):
            menu_id = _last_path_id_or_404(self, path)
            if menu_id is None:
                return
            return update_menu(self, menu_id)

        if path.startswith("/api/billings/"):
            billing_id = _last_path_id_or_404(self, path)
            if billing_id is None:
                return
            return update_billing(self, billing_id)
        
        if path.startswith("/api/staffs/"):
            staff_id = _last_path_id_or_404(self, path)
            if staff_id is None:
                return
            return update_staff(self, staff_id)
       
        
        return send_404(self)
    
    # ---------- delete ----------
    def do_DELETE(self):
        path = urlparse(self.path).path
        if path.startswith("/api/menus/"):
            menu_id = _last_path_id_or_404(self, path)
            if menu_id is None:
                return
            return delete_menu(self, menu_id)


        if path.startswith("/api/billings/"):
            billing_id = _last_path_id_or_404(self, path)
            if billing_id is None:
                return
            return delete_billing(self, billing_id)
        
        if path.startswith("/api/staffs/"):
             staff_id = _last_path_id_or_404(self, path)
             if staff_id is None:
                return
             return delete_staff(self, staff_id)
        
        if path.startswith("/api/receipts/"):
            receipt_id = int(self.path.split("/")[-1])
            return delete_receipt(self, receipt_id)

        
        return send_404(self)
    
     # ---------- logging ----------
    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")
        
    
    