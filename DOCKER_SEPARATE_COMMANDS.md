# Building and Running Services Separately

## Prerequisites
- Docker installed
- Backend database credentials configured

## Individual Build Commands

### 1. Build Backend
```bash
cd backend
docker build -t school-backend:latest .
cd ..
```

### 2. Build Frontend
```bash
cd frontend
docker build -t school-frontend:latest .
cd ..
```

### 3. Build Admin
```bash
cd admin
docker build -t school-admin:latest .
cd ..
```

## Individual Run Commands

### 1. Run Backend (Port 5000)
```bash
docker run -d \
  --name school-backend \
  -p 5000:5000 \
  -e PORT=5000 \
  -e DB_HOST=fdbfaab122c0842cf1db7eec.twc1.net \
  -e DB_PORT=5432 \
  -e DB_NAME=db_Jomiweb \
  -e DB_USER=gen_user \
  -e DB_PASSWORD=Ac128Sp3 \
  -e NODE_ENV=production \
  -e JWT_SECRET=your-secret-key \
  -e JWT_EXPIRE=7d \
  -e PGSSLROOTCERT=/app/certs/root.crt \
  -e UPLOAD_PATH=/app/uploads \
  -v $(pwd)/backend/uploads:/app/uploads \
  school-backend:latest
```

### 2. Run Frontend (Port 8834)
**For Mac/Windows (using host.docker.internal):**
```bash
docker run -d \
  --name school-frontend \
  -p 8834:80 \
  -e BACKEND_HOST=host.docker.internal:5000 \
  school-frontend:latest
```

**For Linux (using server IP):**
```bash
docker run -d \
  --name school-frontend \
  -p 8834:80 \
  -e BACKEND_HOST=192.168.0.4:5000 \
  school-frontend:latest
```

### 3. Run Admin (Port 8833)
**For Mac/Windows (using host.docker.internal):**
```bash
docker run -d \
  --name school-admin \
  -p 8833:80 \
  -e BACKEND_HOST=host.docker.internal:5000 \
  school-admin:latest
```

**For Linux (using server IP):**
```bash
docker run -d \
  --name school-admin \
  -p 8833:80 \
  -e BACKEND_HOST=192.168.0.4:5000 \
  school-admin:latest
```

## Using the Script

Alternatively, use the provided script:
```bash
cd JomiWeb
./build-and-run-separate.sh
```

Or with custom backend host:
```bash
BACKEND_HOST=192.168.0.4:5000 ./build-and-run-separate.sh
```

## Access URLs

After running all services:
- **Backend API**: http://localhost:5000
- **Frontend Website**: http://localhost:8834
- **Admin Panel**: http://localhost:8833

## Stopping Services

```bash
docker stop school-backend school-frontend school-admin
docker rm school-backend school-frontend school-admin
```

## Notes

- On Linux, you may need to use `--network host` or the actual server IP instead of `host.docker.internal`
- Make sure the backend is running before starting frontend/admin
- The backend needs a few seconds to initialize and run migrations

