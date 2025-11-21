# Deploying on Server with Docker Compose

## Prerequisites

1. **Fix Database Permissions First** (if not done already):
   ```bash
   export PGSSLROOTCERT=$HOME/.cloud-certs/root.crt
   psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/postgres?sslmode=verify-full'
   ```
   
   Then run:
   ```sql
   GRANT CONNECT ON DATABASE "db_Jomiweb" TO gen_user;
   GRANT USAGE, CREATE ON SCHEMA public TO gen_user;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gen_user;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO gen_user;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO gen_user;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO gen_user;
   \q
   ```

2. **Ensure SSL Certificate is Available**:
   ```bash
   mkdir -p ~/.cloud-certs
   curl -o ~/.cloud-certs/root.crt "https://st.timeweb.com/cloud-static/ca.crt"
   chmod 0600 ~/.cloud-certs/root.crt
   ```

## Step-by-Step Deployment

### 1. Navigate to Project Directory
```bash
cd ~/JomiWeb
```

### 2. Build All Services
```bash
docker compose build
```

This will build:
- Backend (Node.js API)
- Frontend (React website)
- Admin (React admin panel)

### 3. Start All Services
```bash
docker compose up -d
```

The `-d` flag runs containers in detached mode (background).

### 4. Check Status
```bash
docker compose ps
```

You should see all three services running:
- `school_backend` on port 5000
- `school_frontend` on port 8834
- `school_admin` on port 8833

### 5. View Logs
```bash
# View all logs
docker compose logs

# View specific service logs
docker compose logs backend
docker compose logs frontend
docker compose logs admin

# Follow logs in real-time
docker compose logs -f
```

## Access Your Services

After starting, access:
- **Frontend Website**: `http://your-server-ip:8834`
- **Admin Panel**: `http://your-server-ip:8833`
- **Backend API**: `http://your-server-ip:5000`
- **API Docs**: `http://your-server-ip:5000/api-docs`

## Common Commands

### Stop All Services
```bash
docker compose down
```

### Restart All Services
```bash
docker compose restart
```

### Restart Specific Service
```bash
docker compose restart backend
docker compose restart frontend
docker compose restart admin
```

### Rebuild and Restart
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

### View Logs for Troubleshooting
```bash
# Backend logs (most important for errors)
docker compose logs backend

# All logs
docker compose logs

# Follow logs
docker compose logs -f backend
```

## Troubleshooting

### If Backend Fails to Start

1. **Check database permissions** (see Prerequisites)
2. **Check backend logs**:
   ```bash
   docker compose logs backend
   ```
3. **Verify database connection**:
   ```bash
   docker compose exec backend sh
   # Inside container, test connection
   export PGSSLROOTCERT=/app/certs/root.crt
   psql 'postgresql://gen_user:Ac128Sp3@fdbfaab122c0842cf1db7eec.twc1.net:5432/db_Jomiweb?sslmode=verify-full'
   ```

### If Frontend/Admin Can't Connect to Backend

1. **Check if backend is running**:
   ```bash
   docker compose ps
   ```
2. **Check backend logs**:
   ```bash
   docker compose logs backend
   ```
3. **Test backend directly**:
   ```bash
   curl http://localhost:5000/api/health
   ```

### Port Already in Use

If you get "port already in use" error:
```bash
# Find what's using the port
sudo lsof -i :8834
sudo lsof -i :8833
sudo lsof -i :5000

# Stop the process or change ports in docker-compose.yml
```

## Update Services

When you make code changes:

```bash
# Stop services
docker compose down

# Rebuild with latest code
docker compose build

# Start again
docker compose up -d
```

## Environment Variables

To customize settings, create a `.env` file in the `JomiWeb` directory:

```env
JWT_SECRET=your-super-secret-key-here
DB_HOST=fdbfaab122c0842cf1db7eec.twc1.net
DB_NAME=db_Jomiweb
DB_USER=gen_user
DB_PASSWORD=Ac128Sp3
```

Then update `docker-compose.yml` to use `${JWT_SECRET}` etc.

## Firewall Configuration

Make sure these ports are open in your server firewall:
- **8834** (Frontend)
- **8833** (Admin)
- **5000** (Backend API - optional, only if you want external access)

```bash
# Ubuntu/Debian
sudo ufw allow 8834
sudo ufw allow 8833
sudo ufw allow 5000  # Optional

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=8834/tcp
sudo firewall-cmd --permanent --add-port=8833/tcp
sudo firewall-cmd --permanent --add-port=5000/tcp  # Optional
sudo firewall-cmd --reload
```

## Production Recommendations

1. **Set a strong JWT_SECRET**:
   ```bash
   export JWT_SECRET=$(openssl rand -base64 32)
   docker compose up -d
   ```

2. **Use a reverse proxy** (Nginx/Apache) in front of Docker containers for:
   - SSL/HTTPS
   - Domain names
   - Better security

3. **Set up automatic backups** for the database

4. **Monitor logs** regularly:
   ```bash
   docker compose logs -f
   ```

