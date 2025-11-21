# Fix Database Permissions Issue

## Problem
The error `permission denied for database "db_Jomiweb"` means the user `gen_user` doesn't have CONNECT privilege on the database.

## Solution

### Option 1: Grant Permissions via SQL (Recommended)

Connect to your PostgreSQL server as a superuser or database owner and run:

```bash
export PGSSLROOTCERT=$HOME/.cloud-certs/root.crt
psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/postgres?sslmode=verify-full'
```

Or if you have a superuser account:
```bash
psql 'postgresql://superuser:password@fdbfaab122c0842cf1db7eec.twc1.net:5432/postgres?sslmode=verify-full'
```

Then run these SQL commands:

```sql
-- Grant CONNECT privilege
GRANT CONNECT ON DATABASE "db_Jomiweb" TO gen_user;

-- Grant schema privileges
GRANT USAGE ON SCHEMA public TO gen_user;
GRANT CREATE ON SCHEMA public TO gen_user;

-- Grant privileges on existing objects
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gen_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO gen_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO gen_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO gen_user;
```

### Option 2: Check Database Name

If you're using a managed PostgreSQL service, the database name might be different. Try:

1. Connect to the `postgres` or `default_db` database first
2. List all databases: `\l`
3. Verify the correct database name

If the database name is different, update `docker-compose.yml`:
```yaml
DB_NAME: default_db  # or whatever the correct name is
```

### Option 3: Use Database Admin Panel

If you have access to a database admin panel (like Timeweb Cloud panel):
1. Go to your database management interface
2. Find the database `db_Jomiweb`
3. Grant user `gen_user` the following permissions:
   - CONNECT
   - CREATE
   - All privileges on schema `public`

### Option 4: Contact Database Administrator

If you don't have superuser access, contact your database administrator to grant these permissions.

## After Fixing Permissions

Once permissions are granted, restart the backend:

```bash
docker compose restart backend
```

Or rebuild and restart:

```bash
docker compose down
docker compose up -d
```

## Verify Connection

Test the connection manually:

```bash
export PGSSLROOTCERT=$HOME/.cloud-certs/root.crt
psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/db_Jomiweb?sslmode=verify-full'
```

If this connects successfully, the permissions are fixed.

