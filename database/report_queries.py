from datetime import datetime
from .connection import get_connection

def enrollment_report():
    """
    Returns joined rows: enrollment + billing id + menu id
    """
    conn = get_connection()
    rows = conn.execute("""
        SELECT
            e.id AS enrollment_id,
            e.enrolled_on,
            b.id AS billing_id,
            b.name AS billing_name,
            m.id AS menu_id,
            m.title AS menu_Category
        FROM enrollments e
        JOIN billings s ON s.id = e.billing_id
        JOIN menus c ON c.id = e.menu_id
        ORDER BY e.id DESC;
    """).fetchall()
    conn.close()
    return [dict(r) for r in rows]