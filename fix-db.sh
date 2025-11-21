#!/bin/bash

# Quick script to fix database permissions
# Run this on your server

echo "Setting up SSL certificate..."
mkdir -p ~/.cloud-certs
curl -o ~/.cloud-certs/root.crt "https://st.timeweb.com/cloud-static/ca.crt"
chmod 0600 ~/.cloud-certs/root.crt

export PGSSLROOTCERT=$HOME/.cloud-certs/root.crt

echo ""
echo "Attempting to connect to PostgreSQL..."
echo "If connection fails, you may need to use a different database (postgres or default_db)"
echo ""

psql 'postgresql://umed:umed2020@fdbfaab122c0842cf1db7eec.twc1.net:5432/postgres?sslmode=verify-full' <<EOF
GRANT CONNECT ON DATABASE "db_Jomiweb" TO umed;
GRANT USAGE ON SCHEMA public TO umed;
GRANT CREATE ON SCHEMA public TO umed;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO umed;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO umed;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO umed;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO umed;
\q
EOF

echo ""
echo "✅ Permissions granted! Now restart docker compose:"
echo "   docker compose down && docker compose up -d"

