#!/bin/bash

# Script to build and run each service separately
# Usage: ./build-and-run-separate.sh

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BACKEND_HOST="${BACKEND_HOST:-host.docker.internal:5000}"  # Use host.docker.internal for Mac/Windows, or your server IP for Linux
BACKEND_PORT=5000
FRONTEND_PORT=8834
ADMIN_PORT=8833

echo -e "${BLUE}=== Building and Running Services Separately ===${NC}\n"

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo -e "${YELLOW}Warning: Port $1 is already in use${NC}"
        return 1
    fi
    return 0
}

# Build Backend
echo -e "${GREEN}1. Building Backend...${NC}"
cd backend
docker build -t school-backend:latest .
cd ..

# Build Frontend
echo -e "${GREEN}2. Building Frontend...${NC}"
cd frontend
docker build -t school-frontend:latest .
cd ..

# Build Admin
echo -e "${GREEN}3. Building Admin...${NC}"
cd admin
docker build -t school-admin:latest .
cd ..

echo -e "\n${BLUE}=== Starting Services ===${NC}\n"

# Start Backend
echo -e "${GREEN}Starting Backend on port $BACKEND_PORT...${NC}"
check_port $BACKEND_PORT
docker run -d \
  --name school-backend \
  -p $BACKEND_PORT:5000 \
  -e PORT=5000 \
  -e DB_HOST=fdbfaab122c0842cf1db7eec.twc1.net \
  -e DB_PORT=5432 \
  -e DB_NAME=db_Jomiweb \
  -e DB_USER=umed \
  -e DB_PASSWORD=umed2020 \
  -e NODE_ENV=production \
  -e JWT_SECRET="${JWT_SECRET:-change-me-in-production}" \
  -e JWT_EXPIRE=7d \
  -e PGSSLROOTCERT=/app/certs/root.crt \
  -e UPLOAD_PATH=/app/uploads \
  -v $(pwd)/backend/uploads:/app/uploads \
  school-backend:latest

echo -e "${GREEN}Backend started! Waiting 5 seconds for it to initialize...${NC}"
sleep 5

# Start Frontend
echo -e "${GREEN}Starting Frontend on port $FRONTEND_PORT...${NC}"
check_port $FRONTEND_PORT
docker run -d \
  --name school-frontend \
  -p $FRONTEND_PORT:80 \
  -e BACKEND_HOST=$BACKEND_HOST \
  school-frontend:latest

# Start Admin
echo -e "${GREEN}Starting Admin on port $ADMIN_PORT...${NC}"
check_port $ADMIN_PORT
docker run -d \
  --name school-admin \
  -p $ADMIN_PORT:80 \
  -e BACKEND_HOST=$BACKEND_HOST \
  school-admin:latest

echo -e "\n${GREEN}=== All Services Started! ===${NC}\n"
echo -e "Backend:  http://localhost:$BACKEND_PORT"
echo -e "Frontend: http://localhost:$FRONTEND_PORT"
echo -e "Admin:    http://localhost:$ADMIN_PORT"
echo -e "\n${YELLOW}Note: If running on Linux, you may need to set BACKEND_HOST to your server's IP address${NC}"
echo -e "${YELLOW}Example: BACKEND_HOST=192.168.0.4:5000 ./build-and-run-separate.sh${NC}"

