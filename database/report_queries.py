from .connection import get_connection

def receipt_report():
    """
    Returns joined rows: receipt + billing id + menu id
    """
    conn = get_connection()
    rows = conn.execute("""
        SELECT
            e.id AS receipt_id,
            e.receipt_on,
            b.id AS billing_id,
            b.order_by AS billing_order_by,
            m.id AS menu_id,
            m.name AS menu_name
        FROM receipts r
        JOIN billings b ON b.id = r.billing_id
        JOIN menus m ON m.id = r.menu_id
        ORDER BY r.id DESC;
    """).fetchall()
    conn.close()
    return [dict(r) for r in rows]