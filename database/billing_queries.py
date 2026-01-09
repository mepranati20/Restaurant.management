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
        "INSERT INTO billings (order_by, total_items, amount, created_at) VALUES (?, ?, ?, ?)",
        (data["order_by"], data["total_items"], data["amount"], now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)


def db_update(billing_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute(
        "UPDATE billings SET order_by=?, total_items=?, amount=?, updated_at=? WHERE id=?",
        (data["order_by"], data["total_items"], data["amount"], now, billing_id)
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
def db_get_all_with_menu():
    conn = get_connection()

    rows = conn.execute("""
     SELECT
        b.id AS billing_id,
        b.order_by,
        b.total_items,
        b.amount,
        b.created_at,

        m.id AS menu_id,
        m.name AS menu_name,
        m.price AS menu_price,

        bi.quantity,
        (m.price * bi.quantity) AS item_total
    FROM billings b
    INNER JOIN billing_items bi
        ON b.id = bi.billing_id
    INNER JOIN menus m
        ON bi.menu_id = m.id
    ORDER BY b.id DESC
    """).fetchall()
    conn.close()

    result = []
    for r in rows:
        result.append({
            "id": r["billing_id"],
            "order_by": r["order_by"],
            "total_items": r["total_items"],
            "amount": r["amount"],
            "created_at": r["billing_created_at"],
            "menu": {
                "id": r["menu_id"],
                "category": r["category"],
                "name": r["name"],
                "price": r["price"],
                "created_at": r["created_at"]
               
            }
        })


# from .connection import get_connection

# def db_get_billings_with_menu():
#     conn = get_connection()

#     rows = conn.execute("""
#         SELECT
#             b.id,
#             b.order_by,
#             b.total_items,
#             b.amount,
#             m.name AS menu_name,
#             m.price AS menu_price
#         FROM billings b
#         JOIN menus m ON b.menu_id = m.id
#         ORDER BY b.id DESC
#     """).fetchall()

#     conn.close()
#     return [dict(r) for r in rows]

