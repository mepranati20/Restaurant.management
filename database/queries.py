from datetime import datetime
import sqlite3
from database.connection import get_connection


# ==================================================
# MENU QUERIES
# ==================================================

def menu_get_all():
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    rows = conn.execute("SELECT * FROM menu ORDER BY name ASC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def menu_get_one(name):
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    row = conn.execute("SELECT * FROM menu WHERE name = ?", (name,)).fetchone()
    conn.close()
    return dict(row) if row else None


def menu_create(data):
    conn = get_connection()
    conn.execute(
        "INSERT INTO menu (name, price, rating) VALUES (?, ?, ?)",
        (data["name"], data["price"], data["rating"])
    )
    conn.commit()
    conn.close()
    return menu_get_one(data["name"])


def menu_update(name, data):
    conn = get_connection()
    conn.execute(
        "UPDATE menu SET price=?, rating=? WHERE name=?",
        (data["price"], data["rating"], name)
    )
    conn.commit()
    conn.close()
    return menu_get_one(name)


def menu_delete(name):
    menu = menu_get_one(name)
    if not menu:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM menu WHERE name=?", (name,))
    conn.commit()
    conn.close()
    return menu


# ==================================================
# BILLING QUERIES
# ==================================================

def billing_get_all():
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    rows = conn.execute("SELECT * FROM billing ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def billing_get_one(billing_id):
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    row = conn.execute(
        "SELECT * FROM billing WHERE id = ?",
        (billing_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def billing_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        "INSERT INTO billing (total_items, amount, created_at) VALUES (?, ?, ?)",
        (data["total_items"], data["amount"], now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return billing_get_one(new_id)


def billing_update(billing_id, data):
    conn = get_connection()
    conn.execute(
        "UPDATE billing SET total_items=?, amount=? WHERE id=?",
        (data["total_items"], data["amount"], billing_id)
    )
    conn.commit()
    conn.close()
    return billing_get_one(billing_id)


def billing_delete(billing_id):
    billing = billing_get_one(billing_id)
    if not billing:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM billing WHERE id=?", (billing_id,))
    conn.commit()
    conn.close()
    return billing


# ==================================================
# STAFF QUERIES
# ==================================================

def staff_get_all():
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    rows = conn.execute("SELECT * FROM staff ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def staff_get_one(staff_id):
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    row = conn.execute(
        "SELECT * FROM staff WHERE id = ?",
        (staff_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def staff_create(data):
    conn = get_connection()
    cur = conn.execute(
        "INSERT INTO staff (name, email, age) VALUES (?, ?, ?)",
        (data["name"], data["email"], data["age"])
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return staff_get_one(new_id)


def staff_update(staff_id, data):
    conn = get_connection()
    conn.execute(
        "UPDATE staff SET name=?, email=?, age=? WHERE id=?",
        (data["name"], data["email"], data["age"], staff_id)
    )
    conn.commit()
    conn.close()
    return staff_get_one(staff_id)


def staff_delete(staff_id):
    staff = staff_get_one(staff_id)
    if not staff:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM staff WHERE id=?", (staff_id,))
    conn.commit()
    conn.close()
    return staff
