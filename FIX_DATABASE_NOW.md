# Fix Database Permission Error - Step by Step

## The Problem
The error says: `permission denied for database "db_Jomiweb"` - the user `gen_user` cannot connect to the database.

## The Solution - Run These Commands on Your Server

### Step 1: Connect to PostgreSQL

```bash
export PGSSLROOTCERT=$HOME/.cloud-certs/root.crt
psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/postgres?sslmode=verify-full'
```

**Note:** If connecting to `postgres` database doesn't work, try `default_db`:
```bash
psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/default_db?sslmode=verify-full'
```

### Step 2: Once Connected, Run These SQL Commands

Copy and paste ALL of these commands:

```sql
GRANT CONNECT ON DATABASE "db_Jomiweb" TO gen_user;
GRANT USAGE ON SCHEMA public TO gen_user;
GRANT CREATE ON SCHEMA public TO gen_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gen_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO gen_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO gen_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO gen_user;
\q
```

### Step 3: Test the Connection

```bash
psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/db_Jomiweb?sslmode=verify-full'
```

If this connects successfully (you see `db_Jomiweb=>`), permissions are fixed!

### Step 4: Restart Docker Compose

```bash
cd ~/JomiWeb
docker compose down
docker compose up -d
```

## If You Can't Connect to PostgreSQL

If you get "permission denied" when trying to connect to `postgres` or `default_db`, you have two options:

### Option A: Use Database Admin Panel
If you have access to Timeweb Cloud panel or another database management interface:
1. Go to your database management panel
2. Find database `db_Jomiweb`
3. Grant user `gen_user` these permissions:
   - CONNECT
   - CREATE
   - All privileges on schema `public`

### Option B: Contact Database Administrator
Ask your database administrator to run the SQL commands from Step 2.

## After Fixing

Once permissions are granted, your `docker compose up` should work and you'll see:

```
school_backend   | Database tables created successfully
school_backend   | Server running on port 5000
```

Then all services will be running! ✅

