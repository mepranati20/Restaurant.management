# Handlers are responsible for dealing with HTTP details (headers, body, methods)

import json
from core.responses import send_json, send_404
from core.request import parse_json_body
from services.staff import (
    service_get_all
    , service_get_one
    , service_create
    , service_update
    , service_delete
)

def get_all_staff(handler):
    return send_json(handler, 200, service_get_all())

def get_staff(handler, staff_id):
    staff = service_get_one(staff_id)
    return send_json(handler, 200, staff) if staff else send_404(handler)

def create_staff(handler):
    data = parse_json_body(handler)
    new_staff= service_create(data)
    return send_json(handler, 201, new_staff)

def update_staff(handler, staff_id):
    data = parse_json_body(handler)
    updated = service_update(staff_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

def delete_staff(handler, staff_id):
    deleted = service_delete(staff_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)