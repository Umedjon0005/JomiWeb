# Fix Database Permissions - Complete Steps

## Step 1: Setup SSL Certificate (if not done)

```bash
mkdir -p ~/.cloud-certs && \
curl -o ~/.cloud-certs/root.crt "https://st.timeweb.com/cloud-static/ca.crt" && \
chmod 0600 ~/.cloud-certs/root.crt
```

## Step 2: Export Certificate Path

```bash
export PGSSLROOTCERT=$HOME/.cloud-certs/root.crt
```

## Step 3: Try to Connect to db_Jomiweb

```bash
psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/db_Jomiweb?sslmode=verify-full'
```

**If this works** (you see `db_Jomiweb=>`), skip to Step 5.

**If this fails** with "permission denied", continue to Step 4.

## Step 4: Connect to postgres or default_db Database

Since you can't connect to `db_Jomiweb`, try connecting to the default `postgres` database:

```bash
psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/postgres?sslmode=verify-full'
```

If that doesn't work, try `default_db`:

```bash
psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/default_db?sslmode=verify-full'
```

## Step 5: Grant Permissions

Once connected (you should see a prompt like `postgres=>` or `default_db=>`), run these SQL commands:

```sql
-- Grant CONNECT permission on the database
GRANT CONNECT ON DATABASE "db_Jomiweb" TO gen_user;

-- Grant schema permissions
GRANT USAGE ON SCHEMA public TO gen_user;
GRANT CREATE ON SCHEMA public TO gen_user;

-- Grant privileges on existing objects
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gen_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO gen_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO gen_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO gen_user;

-- Exit
\q
```

## Step 6: Test Connection to db_Jomiweb

Now try connecting to `db_Jomiweb` again:

```bash
psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/db_Jomiweb?sslmode=verify-full'
```

**If this works**, you should see `db_Jomiweb=>` - permissions are fixed! ✅

Type `\q` to exit.

## Step 7: Restart Docker Compose

```bash
cd ~/JomiWeb
docker compose down
docker compose up -d
```

Now the backend should connect successfully and create the tables!

## Troubleshooting

### If you can't connect to postgres or default_db either:

1. **Check if you have a superuser account** - You might need to use a different user with admin privileges
2. **Use Database Admin Panel** - If you have access to Timeweb Cloud panel:
   - Go to your database management interface
   - Find database `db_Jomiweb`
   - Grant user `gen_user` these permissions:
     - CONNECT
     - CREATE  
     - All privileges on schema `public`
3. **Contact Database Administrator** - Ask them to run the SQL commands from Step 5

### Verify Certificate is Correct

```bash
ls -la ~/.cloud-certs/root.crt
```

Should show the file exists and has permissions `-rw-------` (600).

