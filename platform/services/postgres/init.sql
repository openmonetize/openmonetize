-- OpenMonetize PostgreSQL Initialization Script
-- This script runs automatically when the container starts

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search
CREATE EXTENSION IF NOT EXISTS "btree_gist"; -- For advanced indexing

-- Set timezone
SET timezone = 'UTC';

-- Create database user with limited privileges (optional, for production)
-- CREATE USER monetization_app WITH PASSWORD 'secure_password';
-- GRANT CONNECT ON DATABASE monetization TO monetization_app;

-- Grant schema privileges
GRANT USAGE, CREATE ON SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;

-- Performance tuning for development
ALTER SYSTEM SET shared_buffers TO '256MB';
ALTER SYSTEM SET effective_cache_size TO '1GB';
ALTER SYSTEM SET maintenance_work_mem TO '64MB';
ALTER SYSTEM SET checkpoint_completion_target TO '0.9';
ALTER SYSTEM SET wal_buffers TO '16MB';
ALTER SYSTEM SET default_statistics_target TO '100';
ALTER SYSTEM SET random_page_cost TO '1.1';
ALTER SYSTEM SET effective_io_concurrency TO '200';

-- Log configuration for debugging
ALTER SYSTEM SET log_statement TO 'mod'; -- Log all modifications
ALTER SYSTEM SET log_duration TO 'on';
ALTER SYSTEM SET log_min_duration_statement TO '100'; -- Log queries slower than 100ms

SELECT pg_reload_conf();

-- Create initial roles
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'readonly') THEN
        CREATE ROLE readonly;
    END IF;
END
$$;

GRANT CONNECT ON DATABASE monetization TO readonly;
GRANT USAGE ON SCHEMA public TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly;

\echo 'PostgreSQL initialization complete for OpenMonetize'
