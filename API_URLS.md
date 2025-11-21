# API URLs and Ports Configuration

## Correct URLs

### Backend API (Direct Access)
- **URL**: `http://194.187.122.145:5000`
- **API Docs**: `http://194.187.122.145:5000/api-docs`
- **Health Check**: `http://194.187.122.145:5000/api/health`

### Frontend Website
- **URL**: `http://194.187.122.145:8834`
- **API Requests**: `http://194.187.122.145:8834/api/*` (proxied to backend:5000)

### Admin Panel
- **URL**: `http://194.187.122.145:8833`
- **API Requests**: `http://194.187.122.145:8833/api/*` (proxied to backend:5000)

## How It Works

1. **Frontend/Admin make requests to**: `/api/*` (relative URL)
2. **Browser resolves to**: `http://194.187.122.145:8834/api/*` or `http://194.187.122.145:8833/api/*`
3. **Nginx receives request** and proxies to: `http://backend:5000/api/*`
4. **Backend processes** the request on port 5000

## Testing with curl

### Correct curl command (Backend on port 5000):
```bash
curl -X 'POST' \
  'http://194.187.122.145:5000/api/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "admin",
  "password": "admin123"
}'
```

### Or test through nginx proxy (Frontend):
```bash
curl -X 'POST' \
  'http://194.187.122.145:8834/api/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "admin",
  "password": "admin123"
}'
```

### Or test through nginx proxy (Admin):
```bash
curl -X 'POST' \
  'http://194.187.122.145:8833/api/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "admin",
  "password": "admin123"
}'
```

## Port Summary

- **Backend**: Port 5000 (direct API access)
- **Frontend**: Port 8834 (website, proxies API to backend)
- **Admin**: Port 8833 (admin panel, proxies API to backend)

## Important Notes

1. **Never use port 5001** - Backend runs on port 5000
2. **Frontend/Admin use relative URLs** (`/api`) which nginx proxies
3. **CORS is configured** to allow all origins in production
4. **All API requests go through nginx** when accessing via frontend/admin ports

