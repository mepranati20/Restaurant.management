from datetime import datetime
from .connection import get_connection
def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM billings ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def db_get_one(billing_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM billings WHERE id = ?",(billing_id,)).fetchone()
    conn.close()
    return dict(row) if row else None


def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        "INSERT INTO billings (menu_id, order_by, total_items, amount, created_at) VALUES (?, ?, ?, ?, ?)",
        (data["menu_id"], data["order_by"], data["total_items"], data["amount"], now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)


def db_update(billing_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute(
        "UPDATE billings SET menu_id=?, order_by=?, total_items=?, amount=?, updated_at=? WHERE id=?",
        ( data["order_by"], data["total_items"], data["amount"], now, billing_id)
    )
    
    conn.commit()
    conn.close()
    return db_get_one(billing_id)


def db_delete(billing_id):
    billing = db_get_one(billing_id)
    if not billing:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM billings WHERE id=?", (billing_id,))
    conn.commit()
    conn.close()
    return billing

