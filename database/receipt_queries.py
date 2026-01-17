from datetime import datetime
from .connection import get_connection
# -----------------------------
# receiptS CRUD
# -----------------------------

def receipts_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM receipts ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def receipts_get_one(receipt_id: int):
    conn = get_connection()
    row = conn.execute("SELECT * FROM receipts WHERE id = ?", (receipt_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def receipts_create(data: dict):
    """
    Expected data:
      - billing_id (int)
      - menu_id (int)
      - staff_id (int)
      - receipt_on (optional)
    """
    conn = get_connection()
    now = datetime.now().isoformat()
    receipt_on = data.get("receipt_on") or now

    cur = conn.execute(
        "INSERT INTO receipts (billing_id, menu_id, staff_id, receipt_on, created_at) VALUES (?, ?, ?, ?, ?)",
        (data["billing_id"], data["menu_id"], data["staff_id"], receipt_on, now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return receipts_get_one(new_id)

def receipts_delete(receipt_id: int):
    receipt = receipts_get_one(receipt_id)
    if not receipt:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM receipts WHERE id=?", (receipt_id,))
    conn.commit()
    conn.close()
    return receipt





