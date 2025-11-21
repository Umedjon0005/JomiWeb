# Setup Instructions

## What's New

✅ **Photos Management System**
- Added complete backend API for photos management
- Created admin panel for managing photos showcase
- Frontend PhotoShowcase now fetches from backend API
- Photos can be added, edited, and deleted via admin panel

✅ **Modernized Design**
- Enhanced CSS with modern utilities
- Improved animations and transitions
- Better visual hierarchy and spacing

## Running the Project

### Option 1: Using Docker Compose (Recommended)

```bash
cd /Users/umedjonsharipov/Documents/JomiWebMain/JomiWeb
docker compose up --build
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 5000
- Frontend on port 3000
- Admin panel on port 3001

### Option 2: Running Locally (Without Docker)

#### Prerequisites
- Node.js (v18+)
- PostgreSQL database running locally

#### Setup Steps

1. **Start PostgreSQL** (if not running)
   ```bash
   # macOS with Homebrew
   brew services start postgresql@15
   ```

2. **Database Configuration**
   - Host: `fdbfaab122c0842cf1db7eec.twc1.net`
   - Database: `db_Jomiweb`
   - User: `umed`
   - Password: `umed2020`
   - Database is already set up on the remote server

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run migrate  # Creates tables
   npm start  # Runs on http://localhost:5001
   ```

4. **Frontend Setup** (Terminal 2)
   ```bash
   cd frontend
   npm install
   npm run dev  # Runs on http://localhost:3000
   ```

5. **Admin Panel Setup** (Terminal 3)
   ```bash
   cd admin
   npm install
   npm run dev  # Runs on http://localhost:3001
   ```

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

## API Endpoints

### Photos API
- `GET /api/photos` - Get all photos
- `POST /api/photos` - Create photo (Admin only)
- `PUT /api/photos/:id` - Update photo (Admin only)
- `DELETE /api/photos/:id` - Delete photo (Admin only)

### Moments API
- `GET /api/moments` - Get all moments
- `POST /api/moments` - Create moment (Admin only)
- `PUT /api/moments/:id` - Update moment (Admin only)
- `DELETE /api/moments/:id` - Delete moment (Admin only)

## Environment Variables

### Backend (.env)
```
PORT=5001
DB_HOST=fdbfaab122c0842cf1db7eec.twc1.net
DB_PORT=5432
DB_NAME=db_Jomiweb
DB_USER=umed
DB_PASSWORD=umed2020
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
UPLOAD_PATH=./uploads
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5001/api
VITE_MEDIA_URL=http://localhost:5001
```

### Admin (.env)
```
VITE_API_URL=http://localhost:5001/api
VITE_MEDIA_URL=http://localhost:5001
```

## Features

### Admin Panel
- Dashboard with statistics
- News management
- Events management
- Moments gallery management
- **Photos showcase management** (NEW)
- Olympiads management
- Teachers management
- About page content management
- Stats management

### Frontend
- Modern, responsive design
- Photo showcase section (fetches from API)
- Moments gallery (fetches from API)
- News carousel
- Events display
- Teachers showcase
- Olympiads information

## Notes

- Uploaded images are stored in `backend/uploads/`
- The database migration will create all necessary tables automatically
- Photos and Moments can be managed through the admin panel at `/photos` and `/moments` routes

