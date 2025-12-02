#!/bin/bash

echo "🔧 Fixing contact_requests table..."

# Run migration inside the backend container
docker-compose exec backend node add-contact-table.js

# If that doesn't work, try running the full migration
if [ $? -ne 0 ]; then
    echo "⚠️  Trying full migration..."
    docker-compose exec backend npm run migrate
fi

echo "✅ Done! The contact_requests table should now exist."

