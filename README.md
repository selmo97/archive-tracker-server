# collex-server
backend API for Collex (bag collection tracker app)

## Project Board
https://github.com/users/selmo97/projects/4/views/1

## DB Schema

### Tables and Columns

- **users**
 id, email, password_hash, name
- **brands**
 id, name

- **bags** 
id, styel_name, color, style_code, retail_price, purchase_price, notes, user_id (links to users and brands)

- **photos** 
id, bag_id(links to bags)

- **usage_logs**
 id, bag_id(links to bags.id, usage dates, and notes), usage_dates, notes(optional)

