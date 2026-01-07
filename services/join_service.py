import sqlite3
import json

def join_operation():
    conn = sqlite3.connect("restaurant.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    query = """
    SELECT orders.order_id,
           orders.total,
           customers.name,
           customers.phone
    FROM orders
    JOIN customers
      ON orders.customer_id = customers.customer_id
    """

    cursor.execute(query)
    rows = cursor.fetchall()
    conn.close()

    results = [dict(r) for r in rows]

    return json.dumps(results, indent=2)