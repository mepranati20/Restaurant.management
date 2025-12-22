from datetime import datetime
from .connection import get_connection

def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM staffs ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def db_get_one(staff_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM staffs WHERE id = ?", (staff_id,)).fetchone()
    conn.close()
    return dict(row) if row else None


def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        "INSERT INTO staffs (name, age, email, created_at) VALUES (?, ?, ?, ?)",
        ( data["name"], data["age"], data["email"], now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)


def db_update(staff_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute(
        "UPDATE staffs SET name=?, age=?, email=?, updated_at=? WHERE id=?",
        (data["name"], data["age"], data["email"], now, staff_id)
    )
    conn.commit()
    conn.close()
    return db_get_one(staff_id)


def db_delete(staff_id):
    staff = db_get_one(staff_id)
    if not staff:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM staffs WHERE id=?", (staff_id,))
    conn.commit()
    conn.close()
    return staff