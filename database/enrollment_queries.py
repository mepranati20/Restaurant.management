from datetime import datetime
from .connection import get_connection
# -----------------------------
# ENROLLMENTS CRUD
# -----------------------------

def enrollments_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM enrollments ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def enrollments_get_one(enrollment_id: int):
    conn = get_connection()
    row = conn.execute("SELECT * FROM enrollments WHERE id = ?", (enrollment_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def enrollments_create(data: dict):
    """
    Expected data:
      - billing_id (int)
      - menu_id (int)
      - enrolled_on (optional)
    """
    conn = get_connection()
    now = datetime.now().isoformat()
    enrolled_on = data.get("enrolled_on") or now

    cur = conn.execute(
        "INSERT INTO enrollments (billing_id, menu_id, enrolled_on, created_at) VALUES (?, ?, ?, ?)",
        (data["billing_id"], data["menu_id"], enrolled_on, now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return enrollments_get_one(new_id)

def enrollments_delete(enrollment_id: int):
    enrollment = enrollments_get_one(enrollment_id)
    if not enrollment:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM enrollments WHERE id=?", (enrollment_id,))
    conn.commit()
    conn.close()
    return enrollment



