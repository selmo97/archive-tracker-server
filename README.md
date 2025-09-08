# collex-server
backend API for Collex (bag collection tracker app)

## Project Board
https://github.com/users/selmo97/projects/4/views/1

## DB Schema
Tables
- users (id, email, password_hash, name)
- brands (id, name)
- bags (id, styel_name, color, style_code, retail_price, purchase_price, notes, user_id -> FK user_id, brand_id)
- photos (id, bag_id)
- usage_logs (id, bag_id -> FK bags.id, used_on, notes)
