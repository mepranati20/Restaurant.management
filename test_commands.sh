##################### API Observation Via Codespace URL
##################### API Observation Via Hopscotch
##################### API Observation Via CURL
# ==================================================
# MENU 
# ==================================================

# A. Get All menus
curl -X GET "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/menus"


# B. Get One menu
curl -X GET "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/menus/1"

# C. Create menu
curl -X POST "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/menus" \
  -H "Content-Type: application/json" \
  -d '{ 
    "Category": "veg",
    "name": "dalama",
    "price": "65",
    "rating": "4"
    }'

# D. Update menu
curl -X PUT "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/menus/1" \
  -H "Content-Type: application/json" \
  -d '{
  "Category": "veg",
    "name": "dalama",
    "price": "60",
    "rating": "4"
  }'

# E. Delete menu
curl -X DELETE "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/menus/2"

# ==================================================
# BILLING 
# ==================================================

# A. Get All billings
curl -X GET "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/billings"

# B. Get One billing
curl -X GET "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/billings/1"

# C. Create billing
curl -X POST "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/billings" \
  -H "Content-Type: application/json" \
  -d '{
    "order_by": "aki",
    "total_items": "8",
    "amount": "657"
  }'

# D. Update billing
curl -X PUT "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/billings/1" \
  -H "Content-Type: application/json" \
  -d '{
    "order_by": "aki",
    "total_items": "30",
    "amount": "4577"
  }'

# E. Delete billing
curl -X DELETE "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/billings/2"

# ==================================================
# STAFF 
# ==================================================
#  A. Get All staffs
curl -X GET "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/staffs"


# B. Get One staff
curl -X GET "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/staffs/1"

# C. Create staff
curl -X POST "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/staffs" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ria",
    "age": "16",
    "email": "ria@gamil.com"
  }'

# D. Update staff
curl -X PUT "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/staffs/1" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ria",
    "age": "50",
    "email": "ria@gamil.com"
  }'

# E. Delete staff
curl -X DELETE "https://symmetrical-space-trout-jjvrjvxw7xvr35qr5-8000.app.github.dev/api/staffs/2"

##################### DB Observation Via SQLite Web
- install https://github.com/coleifer/sqlite-web
- pip install sqlite-web
- sqlite_web restaurant.db