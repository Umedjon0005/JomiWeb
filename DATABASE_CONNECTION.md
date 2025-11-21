# PostgreSQL Database Connection Details

## Connection Information for pgAdmin

Use these details to connect to your PostgreSQL database via pgAdmin:

### Connection Parameters

| Parameter | Value |
|-----------|-------|
| **Host** | `fdbfaab122c0842cf1db7eec.twc1.net` |
| **Port** | `5432` |
| **Database** | `db_Jomiweb` |
| **Username** | `umed` |
| **Password** | `umed2020` |

### Quick Connection String

```
Host: fdbfaab122c0842cf1db7eec.twc1.net
Port: 5432
Database: db_Jomiweb
Username: umed
Password: umed2020
```

### Steps to Connect in pgAdmin

1. **Open pgAdmin**
2. **Right-click on "Servers"** in the left panel
3. **Select "Create" → "Server..."**
4. **In the "General" tab:**
   - Name: `School Website DB` (or any name you prefer)

5. **In the "Connection" tab, enter:**
   - Host name/address: `fdbfaab122c0842cf1db7eec.twc1.net`
   - Port: `5432`
   - Maintenance database: `db_Jomiweb`
   - Username: `umed`
   - Password: `umed2020`
   - ☑ Save password (optional)
   - ☑ SSL mode: `require` or `verify-full`

6. **Click "Save"**

### Alternative: Connection String Format

If you need to use a connection string:

```
postgresql://umed:umed2020@fdbfaab122c0842cf1db7eec.twc1.net:5432/db_Jomiweb?sslmode=verify-full
```

### Database Tables

Once connected, you'll see these tables:

- `users` - Admin users
- `news` - News articles
- `events` - Events
- `olympiads` - Olympiad competitions
- `moments` - Campus moments gallery
- `photos` - Photo showcase
- `teachers` - Teacher profiles
- `about_content` - About page content
- `stats` - Home page statistics

### Testing Connection

You can test the connection using psql:

```bash
export PGSSLROOTCERT=$HOME/.cloud-certs/root.crt
psql 'postgresql://umed:umed2020@fdbfaab122c0842cf1db7eec.twc1.net:5432/db_Jomiweb?sslmode=verify-full'
```

### Notes

- The database is running on a remote server (Timeweb Cloud)
- Database user: `umed`
- Database password: `umed2020`
- Database name: `db_Jomiweb`
- SSL connection required
- Default PostgreSQL port is `5432`

### Troubleshooting

If you can't connect:

1. **Check if PostgreSQL is running:**
   ```bash
   brew services list | grep postgresql
   ```

2. **Start PostgreSQL if needed:**
   ```bash
   brew services start postgresql@15
   ```

3. **Verify database exists:**
   ```bash
   export PGSSLROOTCERT=$HOME/.cloud-certs/root.crt
   psql 'postgresql://umed:umed2020@fdbfaab122c0842cf1db7eec.twc1.net:5432/postgres?sslmode=verify-full' -c "\l" | grep db_Jomiweb
   ```

4. **Check if user exists:**
   ```bash
   export PGSSLROOTCERT=$HOME/.cloud-certs/root.crt
   psql 'postgresql://umed:umed2020@fdbfaab122c0842cf1db7eec.twc1.net:5432/postgres?sslmode=verify-full' -c "\du"
   ```

