# Fix Contact Requests Table Error

## Problem
You're getting this error:
```json
{
  "message": "Database configuration error. Please contact administrator.",
  "error": "Table contact_requests does not exist. Please run database migration."
}
```

## Solution

The `contact_requests` table needs to be created in your database. Here are the options:

### Option 1: Run SQL directly in your database (Recommended)

Connect to your PostgreSQL database and run:

```sql
CREATE TABLE IF NOT EXISTS contact_requests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  language VARCHAR(10) DEFAULT 'en',
  read_status BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Option 2: Use the SQL file

1. Connect to your database using psql or any PostgreSQL client
2. Connect to database: `db_Jomiweb`
3. Run the SQL file:
   ```bash
   psql -h fdbfaab122c0842cf1db7eec.twc1.net -U umed -d db_Jomiweb -f backend/create-contact-table.sql
   ```

### Option 3: Rebuild the backend container

The migration should run automatically, but if it didn't, rebuild:

```bash
cd /path/to/JomiWebMain/JomiWeb
docker-compose up -d --build backend
```

Or if using docker compose (with space):

```bash
docker compose up -d --build backend
```

### Option 4: SSH into the server and run migration

If you have SSH access to the server:

```bash
# SSH into your server
ssh your-server

# Navigate to project directory
cd /path/to/JomiWebMain/JomiWeb

# Run migration inside container
docker-compose exec backend npm run migrate
```

## Verify

After creating the table, test the contact form again. It should work now!

## Database Connection Info

- Host: fdbfaab122c0842cf1db7eec.twc1.net
- Database: db_Jomiweb
- User: umed
- Port: 5432

