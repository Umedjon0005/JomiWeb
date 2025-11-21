# Quick Fix for Database Permissions

## Run this on your server:

```bash
# First, connect to the postgres database (or default_db) as a superuser
export PGSSLROOTCERT=$HOME/.cloud-certs/root.crt

# Try connecting to postgres database first
psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/postgres?sslmode=verify-full'
```

If that works, run these SQL commands:

```sql
GRANT CONNECT ON DATABASE "db_Jomiweb" TO gen_user;
GRANT USAGE, CREATE ON SCHEMA public TO gen_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gen_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO gen_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO gen_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO gen_user;
\q
```

## Alternative: Check if database name is correct

If you can't connect to `postgres`, try connecting to `default_db`:

```bash
psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/default_db?sslmode=verify-full'
```

Then list databases:
```sql
\l
```

If `db_Jomiweb` doesn't exist, you may need to:
1. Create it, OR
2. Use a different database name in `docker-compose.yml`

## After fixing, restart backend:

```bash
cd ~/JomiWeb
docker compose restart backend
```

