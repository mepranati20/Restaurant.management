from core.responses import send_json, send_404
from core.request import parse_json_body
from services.receipt_service import (
    
    service_get_all,
    service_get_one,
    service_create,
    service_delete
)

def get_all_receipts(handler):
    return send_json(handler, 200, service_get_all())

def get_receipt(handler, receipt_id):
    receipt = service_get_one(receipt_id)
    return send_json(handler, 200, receipt) if receipt else send_404(handler)

def create_receipt(handler):
    data = parse_json_body(handler)
    new_receipt = service_create(data)
    return send_json(handler, 201, new_receipt)

def delete_receipt(handler, receipt_id):
    deleted = service_delete(receipt_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)