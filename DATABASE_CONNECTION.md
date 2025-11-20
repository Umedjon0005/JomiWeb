# PostgreSQL Database Connection Details

## Connection Information for pgAdmin

Use these details to connect to your PostgreSQL database via pgAdmin:

### Connection Parameters

| Parameter | Value |
|-----------|-------|
| **Host** | `localhost` |
| **Port** | `5432` |
| **Database** | `school_db` |
| **Username** | `umedjonsharipov` |
| **Password** | *(empty - leave blank)* |

### Quick Connection String

```
Host: localhost
Port: 5432
Database: school_db
Username: umedjonsharipov
Password: (leave empty)
```

### Steps to Connect in pgAdmin

1. **Open pgAdmin**
2. **Right-click on "Servers"** in the left panel
3. **Select "Create" → "Server..."**
4. **In the "General" tab:**
   - Name: `School Website DB` (or any name you prefer)

5. **In the "Connection" tab, enter:**
   - Host name/address: `localhost`
   - Port: `5432`
   - Maintenance database: `school_db`
   - Username: `umedjonsharipov`
   - Password: *(leave empty)*
   - ☑ Save password (optional)

6. **Click "Save"**

### Alternative: Connection String Format

If you need to use a connection string:

```
postgresql://umedjonsharipov@localhost:5432/school_db
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
psql -h localhost -p 5432 -U umedjonsharipov -d school_db
```

### Notes

- The database is running locally on your machine
- No password is set for the database user
- The database name is `school_db`
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
   psql -l | grep school_db
   ```

4. **Check if user exists:**
   ```bash
   psql -d postgres -c "\du"
   ```

