# Opens a connection to SQLite and returns it for DB operations

import sqlite3

DB_FILE = "menu.db"
DB_FILE = "staff.db"
DB_FILE = "billing.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    conn = get_connection()
    conn.execute(""" 
        CREATE TABLE IF NOT EXISTS billing (
            Total items INTEGER,
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Amount INTEGER
            
        ) 
    """)
    conn.execute(""" 
        CREATE TABLE IF NOT EXISTS menu (
            name TEXT,
            price INTEGER,
            rating INTEGER
            
        ) 
    """)
    conn.execute(""" 
        CREATE TABLE IF NOT EXISTS staff (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            age INTEGER,     
            email TEXT
            
        ) 
    """)
    conn.commit()
    conn.close()
    print("✓ Database initialized")        