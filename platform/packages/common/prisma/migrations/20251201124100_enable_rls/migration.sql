-- Enable Row Level Security on all sensitive tables
ALTER TABLE "customers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "teams" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "credit_wallets" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "credit_transactions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "burn_tables" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "usage_events" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "subscriptions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "entitlements" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "audit_logs" ENABLE ROW LEVEL SECURITY;

-- Drop insecure/old policies if they exist
DROP POLICY IF EXISTS "tenant_isolation" ON "customers";
DROP POLICY IF EXISTS "tenant_isolation" ON "users";
DROP POLICY IF EXISTS "tenant_isolation" ON "usage_events";
DROP POLICY IF EXISTS "tenant_isolation" ON "credit_wallets";

-- Create Secure Policies (Deny by default if setting is missing)
-- Policy for customers table (using id)
CREATE POLICY "tenant_isolation" ON "customers"
    USING (id = current_setting('app.current_customer_id', true)::text);

-- Policy for users table
CREATE POLICY "tenant_isolation" ON "users"
    USING (customer_id = current_setting('app.current_customer_id', true)::text);

-- Policy for teams table
CREATE POLICY "tenant_isolation" ON "teams"
    USING (customer_id = current_setting('app.current_customer_id', true)::text);

-- Policy for credit_wallets table
CREATE POLICY "tenant_isolation" ON "credit_wallets"
    USING (customer_id = current_setting('app.current_customer_id', true)::text);

-- Policy for credit_transactions table
CREATE POLICY "tenant_isolation" ON "credit_transactions"
    USING (customer_id = current_setting('app.current_customer_id', true)::text);

-- Policy for burn_tables table
CREATE POLICY "tenant_isolation" ON "burn_tables"
    USING (customer_id = current_setting('app.current_customer_id', true)::text);

-- Policy for usage_events table
CREATE POLICY "tenant_isolation" ON "usage_events"
    USING (customer_id = current_setting('app.current_customer_id', true)::text);

-- Policy for subscriptions table
CREATE POLICY "tenant_isolation" ON "subscriptions"
    USING (customer_id = current_setting('app.current_customer_id', true)::text);

-- Policy for entitlements table
CREATE POLICY "tenant_isolation" ON "entitlements"
    USING (customer_id = current_setting('app.current_customer_id', true)::text);

-- Policy for audit_logs table
CREATE POLICY "tenant_isolation" ON "audit_logs"
    USING (customer_id = current_setting('app.current_customer_id', true)::text);

-- Create Bypass RLS Role (Idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'billing_worker') THEN
    CREATE ROLE billing_worker;
  END IF;
END
$$;

ALTER ROLE billing_worker WITH BYPASSRLS;
