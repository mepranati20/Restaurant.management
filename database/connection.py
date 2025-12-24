# Opens a connection to SQLite and returns it for DB operations

import sqlite3

DB_FILE = "restaurant.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def init_database():
    conn = get_connection()
    conn.execute(""" 
        CREATE TABLE IF NOT EXISTS menus (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Category TEXT,
            name TEXT,
            price INTEGER,
            rating INTEGER,
            created_at TEXT,
            updated_at TEXT
            
        ) 
    """)
    conn.execute(""" 
        CREATE TABLE IF NOT EXISTS billings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_by TEXT,
            total_items INTEGER,
            amount INTEGER,
            created_at TEXT,
            updated_at TEXT
            
        ) 
    """)


    conn.execute(""" 
        CREATE TABLE IF NOT EXISTS staffs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            age INTEGER,     
            email TEXT,
            created_at TEXT,
            updated_at TEXT
            
        ) 
    """)
    conn.commit()
    conn.close()
    print("✓ Database initialized")        