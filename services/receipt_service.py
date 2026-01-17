# services/enrollment_service.py
# Business logic for enrollments (no HTTP here)

from database.receipt_queries import (
    receipts_get_all,
    receipts_get_one,
    receipts_create,
    receipts_delete
)

def service_get_all():
    return receipts_get_all()

def service_get_one(receipt_id):
    return receipts_get_one(receipt_id)

def service_create(data):
    return receipts_create(data)

def service_delete(receipt_id):
    return receipts_delete(receipt_id)