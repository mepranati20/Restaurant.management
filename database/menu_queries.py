from datetime import datetime
from .connection import get_connection
def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM menus ORDER BY name ASC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


def db_get_one(menu_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM menus WHERE id = ?", (menu_id,)).fetchone()
    conn.close()
    return dict(row) if row else None


def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        "INSERT INTO menus (Category, name, price, rating, created_at) VALUES (?, ?, ?, ?, ?)",
        (data["Category"], data["name"], data["price"], data["rating"], now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)


def db_update(menu_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute(
        "UPDATE menus SET Category=?, name=?, price=?, rating=?, updated_at=? WHERE id=?",
        (data["Category"], data["name"], data["price"], data["rating"], now, menu_id)
    )
    conn.commit()
    conn.close()
    return db_get_one(menu_id)


def db_delete(menu_id):
    menu = db_get_one(menu_id)
    if not menu:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM menus WHERE id=?", (menu_id,))
    conn.commit()
    conn.close()
    return menu
