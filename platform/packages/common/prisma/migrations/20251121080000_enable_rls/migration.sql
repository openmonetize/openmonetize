-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_wallets ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Policy: tenant_isolation
-- Description: Users can only access rows where customer_id matches the current session tenant

-- Customers table (id is the tenant identifier)
CREATE POLICY tenant_isolation ON customers
    USING (current_setting('app.current_tenant', true) IS NULL OR id = current_setting('app.current_tenant', true)::text);

-- Users table
CREATE POLICY tenant_isolation ON users
    USING (current_setting('app.current_tenant', true) IS NULL OR customer_id = current_setting('app.current_tenant', true)::text);

-- Usage Events table
CREATE POLICY tenant_isolation ON usage_events
    USING (current_setting('app.current_tenant', true) IS NULL OR customer_id = current_setting('app.current_tenant', true)::text);

-- Credit Wallets table
CREATE POLICY tenant_isolation ON credit_wallets
    USING (current_setting('app.current_tenant', true) IS NULL OR customer_id = current_setting('app.current_tenant', true)::text);
