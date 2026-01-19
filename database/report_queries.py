from .connection import get_connection

def receipt_report():
    """
    Returns joined rows: receipt + billing id + menu id
    """
    conn = get_connection()
    rows = conn.execute("""
        SELECT
            r.id AS receipt_id,
            r.receipt_on,
                        
            b.id AS billing_id,
            b.order_by AS billing_order_by,
            b.total_items AS billing_total_items ,
            b.total_amount AS billing_total_amount,
                        
            m.id AS menu_id,
            m.name AS menu_name,
            m.Category AS menu_Category,
            m.price AS menu_price,
            m.rating AS menu_rating,
                         
            s.id AS AS staff_id,
            s.name AS staff_name,
            s.age AS staff_age,
            s.email AS staff_email
                                                          
        FROM receipts r
        JOIN billings b ON b.id = r.billing_id
        JOIN menus m ON m.id = r.menu_id
        JOIN staffs s ON s.id = r.staff_id               
        ORDER BY r.id DESC;
    """).fetchall()
    conn.close()
    return [dict(r) for r in rows]