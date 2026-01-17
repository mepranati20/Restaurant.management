from core.responses import send_json
from services.report_service import service_get_receipt_report

def get_receipt_report(handler):
    data = service_get_receipt_report()
    return send_json(handler, 200, data)