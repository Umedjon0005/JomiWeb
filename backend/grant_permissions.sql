-- SQL script to grant permissions to gen_user on db_Jomiweb
-- Run this as a database superuser or the database owner

-- Grant CONNECT privilege on the database
GRANT CONNECT ON DATABASE "db_Jomiweb" TO gen_user;

-- Grant USAGE on the public schema (required to access tables)
GRANT USAGE ON SCHEMA public TO gen_user;

-- Grant CREATE privilege on the public schema (required to create tables)
GRANT CREATE ON SCHEMA public TO gen_user;

-- Grant all privileges on all existing tables (if any)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gen_user;

-- Grant all privileges on all sequences (for SERIAL columns)
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO gen_user;

-- Set default privileges for future tables and sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO gen_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO gen_user;

-- Verify permissions (optional - run this to check)
SELECT 
    datname,
    datacl
FROM pg_database
WHERE datname = 'db_Jomiweb';

